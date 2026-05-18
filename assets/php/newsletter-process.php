<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Also check for form data as fallback
    if (!$input && isset($_POST['email'])) {
        $input = ['email' => $_POST['email']];
    }

    // Validate email
    $email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);

    if (!$email) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
        exit;
    }

    // Save subscription to file (this will always work)
    $saved = saveSubscription($email);
    
    if (!$saved) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to save subscription. Please try again later.']);
        exit;
    }

    // Configuration - UPDATE THESE WITH YOUR DETAILS
    $to_email = 'nickocalumpiano@gmail.com'; // Your email where you want to receive notifications
    $from_email = 'noreply@nixfolio.com'; // From email
    $from_name = 'Nixfolio Newsletter';

    // Email content
    $subject = 'New Newsletter Subscription - Nixfolio';
    $message = "
    <html>
    <head>
        <title>New Newsletter Subscription</title>
    </head>
    <body>
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>
        <p><strong>IP Address:</strong> " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "</p>
    </body>
    </html>
    ";

    // Email headers
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $from_name . ' <' . $from_email . '>',
        'Reply-To: ' . $from_email,
        'X-Mailer: PHP/' . phpversion()
    );

    // Try to send email (optional - don't fail if this doesn't work)
    @mail($to_email, $subject, $message, implode("\r\n", $headers));

    // Always return success if we saved the subscription
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for subscribing! You will receive updates about my latest projects and insights.'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Server error occurred. Please try again later.'
    ]);
}

// Function to save subscription
function saveSubscription($email) {
    try {
        // Check if already subscribed
        $file = __DIR__ . '/../data/newsletter_subscriptions.txt';
        
        // Create directory if it doesn't exist
        $dir = dirname($file);
        if (!is_dir($dir)) {
            if (!mkdir($dir, 0755, true)) {
                return false;
            }
        }
        
        // Check if email already exists
        if (file_exists($file)) {
            $existing = file_get_contents($file);
            if (strpos($existing, $email) !== false) {
                // Email already exists, but still return success
                return true;
            }
        }
        
        // Append to file
        $data = date('Y-m-d H:i:s') . " - " . $email . " - " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";
        return file_put_contents($file, $data, FILE_APPEND | LOCK_EX) !== false;
        
    } catch (Exception $e) {
        return false;
    }
}
?>
