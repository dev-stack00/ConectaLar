# Protótipo Administrativo

Fonte localizada: `C:\Users\User\Downloads\ConectaLar_Telas_Restantes_Administrativo.pdf`.

Status: proposta visual para validação, com dados fictícios. Não considere as telas automaticamente aprovadas, implementadas, publicáveis ou autorizadoras de novas permissões. Preserve a separação entre app cliente/prestador e área administrativa.

## Estrutura do PDF

- Página 1: capa, indica "21 propostas visuais" e orienta revisar cada página.
- Página 2: índice das propostas R01-R21.
- Páginas 3-23: uma tela por proposta.
- Página 24: próxima etapa, agrupando temas para aprovação.

## Telas R01-R21

| Código | Página | Área | Finalidade visual | Pontos pendentes destacados |
| --- | --- | --- | --- | --- |
| R01 | 3 | Acesso | Login administrativo com e-mail, senha e botão entrar. | Confirmar se acesso é exclusivo para contas convidadas. |
| R02 | 4 | Acesso | Recuperação por e-mail e envio de instruções. | Validar canal de recuperação. |
| R03 | 5 | Moderação | Analisar denúncia com blocos de denúncia, perfil, evidência, frase relatada e ações. | Definir decisões e medidas pós-análise. |
| R04 | 6 | Moderação | Lista de avaliações sinalizadas com filtros e botão analisar. | Definir critérios de sinalização. |
| R05 | 7 | Moderação | Moderar avaliação, justificativa e ações de manter/ocultar. | Confirmar política de ocultação e preservação histórica. |
| R06 | 8 | Atendimentos | Lista de atendimentos com filtros por situação e botão detalhes. | Definir filtros prioritários. |
| R07 | 9 | Atendimentos | Detalhes com participantes, preço inicial, histórico e informações importantes. | Definir se administração apenas consulta ou intervém. |
| R08 | 10 | Catálogo | Lista de categorias com status e ação de editar/nova categoria. | Validar categorias e desativação. |
| R09 | 11 | Catálogo | Formulário de editar categoria com nome, descrição, ícone, status e salvar. | Definir campos obrigatórios. |
| R10 | 12 | Catálogo | Serviços dentro de categoria, busca, botão novo serviço e aviso de preço por oferta. | Confirmar padronização do catálogo e preço por prestador. |
| R11 | 13 | Catálogo | Formulário de editar serviço com categoria, nome, descrição e status. | Confirmar que catálogo não define preço único. |
| R12 | 14 | Cobertura | Regiões atendidas para Minas Gerais, alerta de configuração e lista de cidades. | Aprovar cidades de lançamento. |
| R13 | 15 | Cobertura | Configurar cobertura por estado/cidade/bairro/status. | Definir cidade inteira versus bairros. |
| R14 | 16 | Solicitações | Central de solicitações de conta, busca e filtros. | Definir tipos de solicitações. |
| R15 | 17 | Solicitações | Analisar solicitação com blocos de solicitação, identidade e ações. | Definir confirmação de identidade. |
| R16 | 18 | Gestão | Central de Gestão com atalhos operacionais. | Confirmar atalhos necessários. |
| R17 | 19 | Equipe | Administradores, busca, convite e lista de membros. | Definir quem convida e concede permissões. |
| R18 | 20 | Equipe | Permissões de acesso por administrador com toggles. | Definir perfis e permissões de lançamento. |
| R19 | 21 | Equipe | Registro de auditoria com filtros e lista de eventos. | Definir eventos/filtros de auditoria. |
| R20 | 22 | Perfil | Meu perfil administrativo com dados e segurança/sair. | Definir campos editáveis pelo administrador. |
| R21 | 23 | Perfil | Segurança da conta com perfil, alteração de senha, verificação em duas etapas, sessões e encerramento. | Confirmar MFA obrigatório e escopo de sessões. |

## Padrão Visual

- Fundo verde muito claro e cards brancos.
- Cabeçalhos com logo, título forte, subtítulo e em muitos casos sino/indicador.
- Navegação inferior administrativa com ícones para Central, Moderação, Atendimentos, Gestão e Perfil.
- Ações primárias em verde, ações destrutivas em vermelho, alertas em amarelo/laranja.
- Conteúdo compacto em cards com status, filtros e botões pequenos.

## Uso Correto

- Use este PDF para aparência e fluxo administrativo representado, não para aprovar políticas.
- Antes de implementar administração, leia também `requisitos-funcionais.md`, `regras-de-negocio.md`, `seguranca-e-privacidade.md` e `decisoes-pendentes.md`, especialmente P10, P11, P12, P13, P15 e P18.
- Não misture navegação administrativa com a navegação inferior do app de cliente/prestador.
