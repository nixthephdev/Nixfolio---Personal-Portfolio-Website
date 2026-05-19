<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$api_key   = 'f13dcb4b5ec30a16097fbfcb5f3b3e8d-us19';
$list_id   = 'ebfcab4643';
$dc        = 'us19';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input && isset($_POST['email'])) {
    $input = ['email' => $_POST['email']];
}

$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$url  = "https://{$dc}.api.mailchimp.com/3.0/lists/{$list_id}/members";
$data = json_encode([
    'email_address' => $email,
    'status'        => 'subscribed',
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_USERPWD,        'anystring:' . $api_key);
curl_setopt($ch, CURLOPT_POST,           true);
curl_setopt($ch, CURLOPT_POSTFIELDS,     $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER,     ['Content-Type: application/json']);

$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

if ($status === 200) {
    echo json_encode(['success' => true, 'message' => 'Thank you for subscribing! You will receive updates about my latest projects.']);
} elseif ($status === 400 && isset($result['title']) && $result['title'] === 'Member Exists') {
    echo json_encode(['success' => true, 'message' => 'You are already subscribed. Thank you!']);
} else {
    $msg = $result['detail'] ?? 'Failed to subscribe. Please try again later.';
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $msg]);
}
?>
