<?php

declare(strict_types=1);

function responder_json(
    bool $sucesso,
    string $mensagem,
    mixed $dados = null,
    int $codigoHttp = 200
): void {
    http_response_code($codigoHttp);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(
        [
            'success' => $sucesso,
            'message' => $mensagem,
            'data' => $dados,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE
    );
    exit;
}
