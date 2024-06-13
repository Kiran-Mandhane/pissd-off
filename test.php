<?php
// Connect to MySQL database
$servername = "127.0.0.1";
$username = "kiran";
$password = "Bubble808";
$dbname = "WashroomDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request is for /coordinates endpoint
if ($_SERVER['REQUEST_URI'] === '/test.php/coordinates') {
    // Fetch data from MySQL database
    $sql = "SELECT * FROM Washrooms";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        // Output JSON format
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        echo json_encode(array('message' => '0 results'));
    }
} else {
    // Invalid endpoint
    http_response_code(404);
    echo json_encode(array('message' => 'Endpoint not found'));
}

$conn->close();
?>
