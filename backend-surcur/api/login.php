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
    isset($data->correo) &&
    isset($data->contrasena)
) {
    $correo = $data->correo;
    $contrasena = $data->contrasena;

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE correo = ?");
    $stmt->execute([$correo]);
    $usuario = $stmt->fetch();

    if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
        echo json_encode([
            'success' => true,
            'message' => 'Inicio de sesión exitoso',
            'usuario' => [
                'nombre' => $usuario['nombre'],
                'apellidos' => $usuario['apellidos'],
                'correo' => $usuario['correo'],
                'numero_control' => $usuario['numero_control']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
