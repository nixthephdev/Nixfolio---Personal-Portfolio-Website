<?php
header('Content-Type: application/json');

// Database connection details
$servername = "localhost";
$username = "nikkocal_nixfolio";
$password = "ZCQaTXQwNp62pEWWGH64";
$dbname = "nikkocal_nixfolio";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and get form data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone_number = isset($_POST['phone_number']) ? filter_var($_POST['phone_number'], FILTER_SANITIZE_STRING) : '';
    $subject = isset($_POST['subject']) ? filter_var($_POST['subject'], FILTER_SANITIZE_STRING) : '';
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["error" => "Please fill all required fields"]);
        exit;
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO appointments (name, email, phone_number, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone_number, $subject, $message);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["success" => "Message sent successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>