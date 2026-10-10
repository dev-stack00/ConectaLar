# Regras de Negócio

Fonte principal: `ConectaLar_Requisitos_Nao_Funcionais_e_Regras_de_Negocio_Revisado 1.docx`, complementada pelo documento funcional v3.

## Estados Formais do Atendimento

Use somente estes estados formais:

- `aguardando_resposta`: pedido registrado sem decisão do prestador.
- `aceita_agendada`: aceite válido e confirmação registrada.
- `recusada`: prestador recusou o pedido.
- `cancelada`: cancelamento autorizado e registrado.
- `conclusao_confirmada`: cliente confirmou realização.

Rótulos como "Em andamento", "Aguardando avaliação", "Confirmados", "Histórico" e "Proposta enviada" não criam novos estados. Situações de conta, entrega de mensagens e análise documental têm ciclos próprios.

## RB01-RB18 Preservadas

| RB | Tema | Regra essencial |
| --- | --- | --- |
| RB01 | Acesso | Funcionalidades restritas exigem autenticação, autorização por perfil e vínculo com o recurso. |
| RB02 | Conta | A conta deve ter identificador único conforme método aprovado; criação concorrente não pode duplicar conta. |
| RB03 | Dados | Usuários atualizam apenas campos permitidos; dados inválidos preservam valores anteriores. |
| RB04 | Categorias | Categorias são administráveis; inativas não aparecem para novas ofertas e não apagam histórico. |
| RB05 | Busca | Busca cruza categoria/serviço e bairro/cobertura cadastrada. |
| RB06 | Preço inicial | Preço exibido é referência inicial; valor final é combinado fora da plataforma. |
| RB07 | Disponibilidade | Horário solicitado depende de disponibilidade e confirmação do profissional; pendente não é reserva. |
| RB08 | Estados | Estados mínimos/formais são os cinco listados acima. |
| RB09 | Agendamento | Só há agendamento confirmado após aceite do profissional e registro do sistema. |
| RB10 | Privacidade | Endereço completo só é exibido ao prestador autorizado após aceite/agendamento válido. |
| RB11 | Chat | Chat é destinado ao atendimento e acessível apenas aos participantes autorizados. |
| RB12 | Cancelamento | Prazo padrão do cliente: antecedência mínima de 24 horas; exceções e conflitos dependem de P08. |
| RB13 | Conclusão | Avaliação do cliente ao profissional só após conclusão confirmada; cancelados não são concluídos. |
| RB14 | Avaliações | Avaliações vinculam-se a atendimento real e ficam sujeitas à moderação. |
| RB15 | Verificação | Só administração aprova documentos e selo; selo não é garantia absoluta. |
| RB16 | Moderação | Denúncias e decisões seguem critérios definidos e acesso restrito; denúncia não pune automaticamente. |
| RB17 | Registro | Ações administrativas relevantes devem ser registradas com rastreabilidade. |
| RB18 | Notificações | Notificações refletem eventos reais; falha de entrega não altera estado do atendimento. |

## RB19-RB30 Complementares

- RB19 Pagamento externo: detalha escopo vigente; app não cobra, processa pagamento, calcula comissão ou promete garantia financeira.
- RB20 Oferta indisponível e histórico: detalhamento para validação.
- RB21 Cobertura territorial em Minas Gerais: proposta para aprovação.
- RB22 Local do atendimento: proposta para aprovação.
- RB23 Repetição e resultado incerto: detalhamento para validação; operações críticas devem ter um único efeito.
- RB24 Ausência de resposta e nova solicitação: proposta; não presumir expiração automática.
- RB25 Alteração de horário: proposta condicionada ao RF035.
- RB26 Empresas e integrantes: proposta condicionada ao RF040.
- RB27 Encerramento de conta e conservação: proposta para aprovação.
- RB28 Favoritos pessoais: detalhamento do RF010.
- RB29 Informações e manifestação do usuário: proposta para aprovação.
- RB30 Papéis e acesso administrativo: detalhamento para validação.

## Transições Permitidas

- Novo pedido válido -> `aguardando_resposta`.
- `aguardando_resposta` + aceite válido do prestador e registro -> `aceita_agendada`.
- `aguardando_resposta` + recusa do prestador -> `recusada`.
- `aguardando_resposta` ou `aceita_agendada` + cancelamento autorizado -> `cancelada`.
- `aceita_agendada` + confirmação do cliente participante -> `conclusao_confirmada`.
- Avaliar após `conclusao_confirmada` mantém o estado; avaliação é registro vinculado, não estado.

Bloqueie aceitar, concluir ou avaliar como realizado um pedido `recusada` ou `cancelada`. Não reabra pedido finalizado por mensagem de chat.
