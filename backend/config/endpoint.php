<?php

declare(strict_types=1);

require_once __DIR__ . '/response.php';

function endpoint_nao_implementado(string $nome): void
{
    responder_json(
        false,
        "O endpoint {$nome} ainda não foi implementado.",
        [],
        501
    );
}
