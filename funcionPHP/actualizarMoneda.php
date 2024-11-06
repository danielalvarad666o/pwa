<?php
$data = file_get_contents("php://input");

// Comprobar si se recibió algún dato
if ($data) {
    // Intentar escribir en el archivo moneda.json
    $result = file_put_contents("./moneda.json", $data);

    // Verificar si se escribió correctamente
    if ($result !== false) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No se pudo escribir en el archivo moneda.json"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No data received"]);
}
?>
