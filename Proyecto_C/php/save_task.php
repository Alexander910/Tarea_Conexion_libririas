<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = $_POST['task'] ?? '';

    if (!empty($task)) {
        $file = 'tasks.txt';

        // Guardar la tarea en el archivo de texto
        file_put_contents($file, $task . PHP_EOL, FILE_APPEND | LOCK_EX);

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Tarea vacía']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
