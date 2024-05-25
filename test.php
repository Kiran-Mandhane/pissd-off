<?php
// Connect to MySQL database
$servername = "127.0.0.1";
$username = "user";
$password = "pass";
$dbname = "testDB";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from MySQL database
$sql = "SELECT uid FROM student";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "0 results";
}
$conn->close();
?>
