<?php
header('Content-Type: application/json');


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


include '../conexion.php';


$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->nombre) &&
    isset($data->apellidos) &&
    isset($data->correo) &&
    isset($data->contrasena) &&
    isset($data->numero_control)
) {
    $nombre = $data->nombre;
    $apellidos = $data->apellidos;
    $correo = $data->correo;
    $numero_control = $data->numero_control;
    $contrasena = password_hash($data->contrasena, PASSWORD_DEFAULT);

    // Validar que no exista el correo ya
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE correo = ?");
    $stmt->execute([$correo]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'El correo ya está registrado']);
        exit;
    }

    // Insertar nuevo usuario
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, apellidos, correo, contrasena, numero_control) VALUES (?, ?, ?, ?, ?)");
    $result = $stmt->execute([$nombre, $apellidos, $correo, $contrasena, $numero_control]);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar usuario']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
