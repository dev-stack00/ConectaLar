# Requisitos Não Funcionais e Qualidade

Fonte localizada: `C:\Users\User\Downloads\ConectaLar_Requisitos_Nao_Funcionais_e_Regras_de_Negocio_Revisado 1.docx`.

Versão: 8 de outubro de 2026.

Status geral: RNF001-RNF026 são requisitos não funcionais históricos preservados. RNF027-RNF030 são complementares propostos. Q01-Q08 são metas/decisões de qualidade a validar, não resultados comprovados.

## RNF001-RNF026 Preservados

| RNF | Tema |
| --- | --- |
| RNF001 | Autenticação e autorização |
| RNF002 | Proteção de credenciais |
| RNF003 | Comunicação segura |
| RNF004 | Minimização e finalidade |
| RNF005 | Proteção de endereço |
| RNF006 | Documentos de verificação |
| RNF007 | Conformidade com a LGPD |
| RNF008 | Tempo de resposta |
| RNF009 | Busca por bairro e categoria |
| RNF010 | Monitoramento e recuperação |
| RNF011 | Consistência do agendamento |
| RNF012 | Integridade dos estados |
| RNF013 | Entrega resiliente |
| RNF014 | Registro de ações críticas |
| RNF015 | Clareza dos fluxos |
| RNF016 | Uso acessível |
| RNF017 | Dispositivos e sistemas operacionais |
| RNF018 | Conectividade instável |
| RNF019 | Organização e documentação |
| RNF020 | Testes das regras críticas |
| RNF021 | Cópias de segurança |
| RNF022 | Logs, métricas e erros |
| RNF023 | Crescimento do uso |
| RNF024 | Permissão e busca manual |
| RNF025 | Moderação e conteúdo público |
| RNF026 | Preservação de registros |

## RNF027-RNF030 Propostos

- RNF027 Tratamento seguro de arquivos.
- RNF028 Validação e proteção da API.
- RNF029 Sessões e proteção contra abuso.
- RNF030 Publicação e resposta a incidentes.

Não implemente ou declare conformidade com esses complementos como escopo aprovado sem decisão explícita. Eles podem orientar desenho seguro, mas seus parâmetros precisam de aprovação.

## Q01-Q08

| Q | Tema | Uso correto |
| --- | --- | --- |
| Q01 | Tempos e erros | Tratar como proposta até haver meta aprovada e medição. |
| Q02 | Carga inicial | Não declarar capacidade sem teste reprodutível. |
| Q03 | Disponibilidade e recuperação | Exige ambiente, backup e ensaios definidos. |
| Q04 | Segurança e sessões | Depende de P02/P15 e evidência de controles. |
| Q05 | Avisos | Depende de P14 e teste de entrega/consulta. |
| Q06 | Arquivos | Depende de P10/P13 e política de armazenamento. |
| Q07 | Entrega e operação | Depende de pipeline, ambiente e plano de publicação. |
| Q08 | Uso e compatibilidade | Depende de dispositivos/sistemas e testes definidos. |

## Evidência Exigida

- Não declare um RNF atendido apenas porque há código relacionado.
- Relacione requisito, implementação, teste executado e resultado real.
- Diferencie "código preparado", "simulação/mock", "teste unitário", "teste integrado", "teste manual" e "homologação".
- Para segurança, disponibilidade, desempenho, compatibilidade e carga, só afirme atendimento quando houver medições, ambientes e critérios reproduzíveis.
