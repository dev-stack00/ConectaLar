# Rastreabilidade inicial do ConectaLar

## Como ler esta matriz

- “Preservado” descreve a situação documental do requisito, não significa que esteja implementado nem que todos os detalhes dependentes de P estejam decididos.
- RF031–RF042, RNF027–RNF030 e Q01–Q08 são propostas e não devem entrar em escopo automaticamente.
- RB19–RB30 mantêm as situações individuais descritas no documento de qualidade; agrupá-las não as transforma em aprovadas.
- O prompt mestre define a stack Node.js/NestJS/MySQL e prevalece sobre menções históricas a PHP/XAMPP nos requisitos.

## Funcionalidade por domínio

| Área de rastreabilidade da fonte | RFs | RNFs relacionados na fonte | Decisões | Situação de implementação |
| --- | --- | --- | --- | --- |
| Acesso e conta | RF001, RF002, RF025; RF031, RF032, RF038, RF039 propostos | RNF001, RNF002, RNF003, RNF007 | P01, P02, P13, P15, P18 | Não implementado. A API atual não tem autenticação, conta, sessão ou recuperação. |
| Perfil e privacidade | RF003, RF004, RF008, RF017; RF033 proposto | RNF001, RNF004, RNF005, RNF007, RNF026 | P01, P04, P05, P12, P13 | Não implementado. |
| Catálogo e busca | RF005–RF009; RF027 e RF034 propostos | RNF008, RNF009, RNF015, RNF016, RNF024 | P03, P05, P16 | Não implementado. |
| Agenda e atendimento | RF011–RF015, RF018–RF019, RF030; RF035 e RF041 propostos | RNF011, RNF012, RNF018, RNF020 | P04, P06, P07, P08, P09, P12, P17 | Não implementado. Cinco estados estão documentados, sem máquina de estados executável. |
| Favoritos e histórico | RF010, RF029 | RNF001, RNF026 | P04, P13, P16 | Não implementado. |
| Chat e notificações | RF016, RF028; RF036 e RF042 propostos | RNF001, RNF003, RNF013, RNF018, RNF022 | P09, P13, P14 | Não implementado. |
| Avaliações e moderação | RF020, RF021, RF024, RF026 | RNF001, RNF014, RNF020, RNF025, RNF026 | P11, P13, P17 | Não implementado. |
| Verificação documental | RF022, RF023; RF037 proposto | RNF001, RNF004, RNF006, RNF014 | P10, P11, P13 | Não implementado. |
| Empresa e administração | RF004, RF006, RF023–RF027; RF040 proposto | RNF001, RNF014, RNF020 | P11, P12, P15 | Não implementado. |
| Condições de operação | Transversal aos RFs do escopo aprovado | RNF010, RNF017, RNF019, RNF021, RNF022, RNF023 | Q03, Q04, Q07 são propostas em parte; dependências de operação | Não implementado nesta fundação; sem monitoramento, backup, recuperação ou teste de carga configurados. |

As relações da tabela reproduzem a matriz de rastreabilidade do documento funcional revisado. O documento de qualidade mantém critérios próprios e exige homologação sob políticas aprovadas.

## Regras de negócio

- **Preservadas RB01–RB18:** requisitos de acesso, conta, dados, catálogo, busca, preço inicial, disponibilidade, estados, agendamento, privacidade, chat, cancelamento, conclusão, avaliações, verificação, moderação, registro e notificações. Nenhuma está implementada na API atual.
- **RB19:** detalha o escopo vigente de pagamento externo; pagamentos, comissão e garantias financeiras não entram na API.
- **RB20–RB30:** cada regra continua com a situação declarada na fonte (detalhamento para validação, proposta, ou proposta condicionada a RF). Não elevar o grupo inteiro a requisito aprovado.
- Os cinco estados formais são Aguardando resposta, Aceita/agendada, Recusada, Cancelada e Conclusão confirmada. Estados de conta e de verificação são independentes.

## Evidência técnica existente

| Artefato | Requisitos cobertos | Verificação registrada | Limite |
| --- | --- | --- | --- |
| `GET /health` | Fundação técnica; não corresponde a RF de negócio | Teste automatizado confirma somente `{ "status": "ok" }`; smoke test HTTP local passou na validação da Etapa 1. | Não verifica MySQL, login, dependências ou regras do produto. |
| Validação de `NODE_ENV`, `HOST`, `PORT` | Fundação técnica | Teste de configuração inválida passou; typecheck e build passaram com Node 22.23.3. | Não comprova requisitos de conta, autorização ou segurança ponta a ponta. |
| OpenAPI atual | Fundação técnica | `apps/api/openapi.yaml` descreve apenas saúde e envelope genérico de erro. | Contratos de negócio aguardam P01–P18 e convenções revisadas. |

Os critérios CT do documento funcional e os critérios CA dos RF/RNF/RB são planos de verificação; não são evidência de testes executados. Cada módulo deverá acrescentar ligações entre requisito, contrato, migration, implementação e cenário automatizado quando autorizado.
