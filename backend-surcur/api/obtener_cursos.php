<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("mysql:host=localhost;dbname=bdsurcur", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, nombre, carrera FROM cursos";
    $stmt = $pdo->query($sql);
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cursos);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos']);
}
?>

