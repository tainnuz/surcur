<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once("../conexion.php"); // incluye conexión PDO

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'] ?? '';
$carrera = $data['carrera'] ?? '';

if (empty($nombre) || empty($carrera)) {
    echo json_encode(["success" => false, "message" => "Faltan datos: nombre o carrera."]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO cursos (nombre, carrera) VALUES (:nombre, :carrera)");
    $stmt->execute(['nombre' => $nombre, 'carrera' => $carrera]);

    echo json_encode(["success" => true, "message" => "Curso creado exitosamente."]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error al crear curso: " . $e->getMessage()]);
}
?>

