<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include(__DIR__ . "/../conexion.php"); // Asegúrate de que este archivo crea y expone $pdo

// Obtener los datos del JSON recibido
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['titulo']) &&
    isset($data['descripcion']) &&
    isset($data['enlace']) &&
    isset($data['curso_id'])
) {
    try {
        $stmt = $pdo->prepare("INSERT INTO capitulos (titulo, descripcion, enlace, curso_id) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['titulo'],
            $data['descripcion'],
            $data['enlace'],
            $data['curso_id']
        ]);

        echo json_encode(['success' => true, 'message' => 'Capítulo creado exitosamente.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error en la base de datos.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}
?>
