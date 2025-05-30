<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "Falta el parámetro id."]);
    exit;
}

$id = $_GET['id'];

$conn = new mysqli("localhost", "root", "", "nombre_de_tu_base_de_datos");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión."]);
    exit;
}

$sql = "SELECT * FROM cursos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($curso = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "data" => $curso]);
} else {
    echo json_encode(["success" => false, "message" => "Curso no encontrado."]);
}
?>
