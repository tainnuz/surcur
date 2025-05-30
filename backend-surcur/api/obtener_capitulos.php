<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

if (!isset($_GET['curso_id'])) {
    echo json_encode(["success" => false, "message" => "Falta el parámetro curso_id."]);
    exit;
}

$curso_id = $_GET['curso_id'];

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "nombre_de_tu_base_de_datos");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión."]);
    exit;
}

$sql = "SELECT * FROM capitulos WHERE curso_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $curso_id);
$stmt->execute();
$result = $stmt->get_result();

$capitulos = [];
while ($row = $result->fetch_assoc()) {
    $capitulos[] = $row;
}

echo json_encode(["success" => true, "data" => $capitulos]);
?>
