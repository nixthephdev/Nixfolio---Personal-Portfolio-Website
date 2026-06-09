<?php
ini_set('display_errors', '0');
header('Content-Type: application/json');

$servername = "localhost";
$username   = "nikkocal_nixfolio";
$password   = "ZCQaTXQwNp62pEWWGH64";
$dbname     = "nikkocal_nixfolio";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

$name         = htmlspecialchars(strip_tags(trim($_POST['name']   ?? '')));
$email        = filter_var(trim($_POST['email']  ?? ''), FILTER_SANITIZE_EMAIL);
$phone_number = htmlspecialchars(strip_tags(trim($_POST['phone_number'] ?? '')));
$subject      = htmlspecialchars(strip_tags(trim($_POST['subject']      ?? '')));
$message      = htmlspecialchars(strip_tags(trim($_POST['message']      ?? '')));

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["error" => "Please fill all required fields"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO appointments (name, email, phone_number, subject, message) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $phone_number, $subject, $message);

if ($stmt->execute()) {
    echo json_encode(["success" => "Message sent successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
