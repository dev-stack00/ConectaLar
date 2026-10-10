# Requisitos Funcionais

Fonte localizada: `C:\Users\User\Downloads\ConectaLar_Requisitos_Funcionais_v3_Revisado.docx`.

Versão: 3.0, 7 de outubro de 2026. Responsáveis citados no documento: Rodrigo Junior e Samuel Souza.

Status geral: RF001-RF030 são requisitos preservados da base documental. RF031-RF042 são propostas complementares ou condicionadas e não entram no escopo automaticamente.

## Atores e Limites

- Visitante: cria conta e consulta apenas conteúdo permitido; perfil público por visitante depende de P16.
- Cliente: mantém conta, busca, compara, favorita, solicita, acompanha, cancela, conversa, confirma conclusão e avalia, sempre sobre seus dados/atendimentos autorizados.
- Autônomo: mantém perfil, ofertas, preços, região e disponibilidade; responde pedidos; conversa; envia documentos; avalia cliente elegível, sem aprovar o próprio selo.
- Empresa/equipe: atua como prestador organizacional; integrantes, capacidade e executor dependem de P12.
- Administrador: gerencia categorias, catálogo, contas, análise documental, denúncias e avaliações, com ações autorizadas e registradas.
- Sistema: valida dados/acesso, registra estados/eventos, libera endereço e gera avisos; não confirma ação inexistente.

Cadastro público nunca concede papel administrativo. Toda operação privada exige autorização por papel e vínculo com o recurso.

## RF001-RF030 Preservados

| RF | Nome | Decisões vinculadas |
| --- | --- | --- |
| RF001 | Criar conta | P01, P02, P15 |
| RF002 | Autenticar e encerrar sessão | P02, P15 |
| RF003 | Manter perfil do cliente | P01, P04, P13 |
| RF004 | Manter perfil profissional ou de empresa | P01, P03, P05, P12 |
| RF005 | Cadastrar e gerenciar serviços oferecidos | P03, P05, P13 |
| RF006 | Gerenciar categorias | P03, P11 |
| RF007 | Buscar profissionais por categoria e bairro | P03, P05, P16 |
| RF008 | Consultar perfil público do prestador | P01, P03, P05, P10, P16 |
| RF009 | Comparar perfis de prestadores | P03, P16 |
| RF010 | Gerenciar favoritos | P13, P16 |
| RF011 | Informar disponibilidade | P06, P12 |
| RF012 | Enviar solicitação de atendimento | P03, P04, P06, P07 |
| RF013 | Receber e consultar solicitações | P04, P07, P12 |
| RF014 | Aceitar ou recusar solicitação | P06, P07, P12 |
| RF015 | Confirmar agendamento | P06, P12, P14 |
| RF016 | Trocar mensagens pelo chat | P09, P13 |
| RF017 | Controlar liberação do endereço do cliente | P04, P12, P13 |
| RF018 | Cancelar atendimento | P06, P08, P12 |
| RF019 | Confirmar conclusão do serviço | P06, P08, P17 |
| RF020 | Avaliar profissional | P11, P13, P17 |
| RF021 | Avaliar cliente | P11, P17 |
| RF022 | Enviar documentos para verificação | P10, P13 |
| RF023 | Analisar documentos e controlar selo | P10, P11, P13 |
| RF024 | Registrar e analisar denúncias | P11, P13 |
| RF025 | Gerenciar contas de usuários | P02, P11, P15 |
| RF026 | Moderar avaliações | P11, P13, P17 |
| RF027 | Administrar catálogo de serviços | P03, P11, P13 |
| RF028 | Gerar notificações funcionais | P04, P13, P14 |
| RF029 | Consultar histórico de atendimentos | P04, P13 |
| RF030 | Controlar estados e registrar transições do atendimento | P06, P08, P12, P17 |

## RF031-RF042 Propostos

| RF | Nome | Decisões vinculadas |
| --- | --- | --- |
| RF031 | Recuperar acesso à conta | P02 |
| RF032 | Alterar senha e controlar acesso | P02, P15 |
| RF033 | Gerenciar endereços e vincular local ao pedido | P04, P13 |
| RF034 | Configurar cobertura e selecionar local de busca | P05 |
| RF035 | Alterar horário de atendimento | P06, P09 |
| RF036 | Consultar notificações do aplicativo | P14 |
| RF037 | Acompanhar resultado da verificação | P10 |
| RF038 | Solicitar desativação ou exclusão da conta | P13, P15 |
| RF039 | Consultar termos e avisos do serviço | P18 |
| RF040 | Controlar vínculos e atuação de empresa | P12, P15 |
| RF041 | Consultar resultado de operações críticas | P06, P18 |
| RF042 | Configurar preferências de notificações | P14 |

## Fluxos e Interfaces Necessárias

O documento agrupa interfaces por domínios:

- Conta/acesso: RF001, RF002, RF031, RF032.
- Perfil/busca/endereço: RF003, RF007, RF033, RF034.
- Perfil público/comparação/avaliação: RF008, RF009, RF020.
- Prestador/ofertas/agenda/pedidos: RF004, RF005, RF011, RF013, RF014.
- Atendimento: RF012, RF015, RF017, RF018, RF019, RF035, RF041.
- Chat/avisos: RF016, RF028, RF036, RF042.
- Confiança/moderação: RF020-RF024, RF037.
- Favoritos/histórico/conta/termos: RF010, RF029, RF038, RF039.
- Administração: RF006, RF023-RF027.
- Empresas/equipes: RF040.

## Verificação

Critérios CA e cenários CT01-CT15 são planos de verificação, não evidências. Ao declarar um RF implementado, cite o código, testes executados e limitações. Não declare homologação sem executar cenários compatíveis com as políticas aprovadas.
