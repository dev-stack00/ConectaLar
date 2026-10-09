<?php

declare(strict_types=1);

function obter_conexao(): PDO
{
    static $conexao = null;
    if ($conexao instanceof PDO) {
        return $conexao;
    }

    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $nome = getenv('DB_NAME') ?: 'conectalar';
    $usuario = getenv('DB_USER') ?: 'root';
    $senhaAmbiente = getenv('DB_PASSWORD');
    $senha = $senhaAmbiente === false ? '' : $senhaAmbiente;

    $dsn = "mysql:host={$host};dbname={$nome};charset=utf8mb4";
    $opcoes = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $conexao = new PDO($dsn, $usuario, $senha, $opcoes);
    } catch (PDOException $erro) {
        error_log($erro->getMessage());
        require_once __DIR__ . '/response.php';
        responder_json(false, 'Não foi possível conectar ao banco de dados.', null, 500);
    }

    return $conexao;
}
