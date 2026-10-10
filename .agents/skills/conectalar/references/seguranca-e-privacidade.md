# Segurança e Privacidade

Use este guia junto de `requisitos-nao-funcionais.md`, `regras-de-negocio.md` e `docs/seguranca.md`.

## Princípios

- Validar autenticação, autorização por papel e vínculo com o recurso no backend/API.
- Não confiar em controles visuais ou permissões verificadas apenas no Flutter.
- Nunca armazenar senha em texto puro; usar mecanismo de hash apropriado no backend.
- Não expor tokens, credenciais, chaves, senhas, dados privados, stack traces ou detalhes internos em código, logs, respostas de API ou repositório.
- Usar HTTPS com validação de certificado em produção; HTTP local só para desenvolvimento explicitamente configurado.
- Aplicar validação de entrada no cliente e no servidor.
- Usar consultas parametrizadas no banco.
- Minimizar coleta e exposição de dados pessoais, respeitando LGPD e finalidade.

## Dados Restritos

- Endereço completo do cliente: oculto antes de `aceita_agendada`; depois, somente prestador participante autorizado conforme P04/P12/P13.
- Documentos de verificação: acesso restrito; nunca exibir arquivos ou URLs públicas no perfil.
- Chat: ligado ao atendimento e disponível apenas a participantes autorizados.
- Notificações: evitar conteúdo privado em tela bloqueada, logs ou mensagens para destinatários sem vínculo.
- Registros administrativos: rastrear ação, ator, instante, alvo e resultado sem publicar dados privados desnecessários.

## Selo de Verificação

O selo depende de aprovação administrativa de documentos. Não permita autoaprovação, não exiba selo com documento pendente/rejeitado e não descreva o selo como garantia absoluta de segurança, qualidade ou resultado.

## Evidências

Antes de declarar segurança ou RNF atendido:

- Cite o controle implementado no cliente e no backend quando aplicável.
- Cite testes executados e resultado real.
- Informe limitações: mock, endpoint não implementado, ausência de banco, ausência de autenticação, ausência de scan dedicado.
- Repita varreduras de segredos antes de publicação ou envio remoto.

## Alertas para Implementação

- Operações de estado de atendimento, avaliação, documentos, moderação, contas e administração são críticas e precisam de autorização no servidor.
- Falha de envio de notificação ou mensagem não pode alterar estado do atendimento.
- Não implemente Firebase, push, anexos, links públicos permanentes, pagamentos internos ou rastreamento em tempo real sem aprovação explícita e revisão de privacidade.
