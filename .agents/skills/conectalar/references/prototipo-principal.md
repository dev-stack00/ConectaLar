# Protótipo Principal

Fonte localizada: `C:\Users\User\Downloads\Prototipo 2.pdf`.

Status: referência visual para o aplicativo móvel de cliente/prestador. O PDF não substitui requisitos funcionais, regras de negócio nem decisões pendentes. Quando uma interação não estiver representada, marque como não especificada.

## Páginas e Telas

| Página | Tela | Observações visuais identificadas |
| --- | --- | --- |
| 1 | Início | App em moldura de iPhone. Cabeçalho com logo ConectaLar, saudação "Olá!", pergunta "Que serviço você precisa?", ilustração de casa, sino com indicador vermelho, campo de busca por serviço/categoria e bairro. Cards de categorias em grade 4x2 com ícones coloridos. Seção "Profissionais em destaque" com cards horizontais, foto, selo "Verificado", coração, nota, bairro, tags e preço inicial. Navegação inferior com Início ativo. |
| 2 | Buscar profissionais | Cabeçalho com logo, título "Buscar profissionais" e subtítulo de busca local. Campo de busca preenchido, seletor de bairro, chips de categorias/filtros, contagem de resultados, ordenação por relevância. Lista vertical de cards compactos com foto, selo, coração, nota, descrição, localização, tags, preço inicial e botão "Ver perfil". Navegação inferior com Buscar ativo. |
| 3 | Meus favoritos | Título "Meus favoritos", subtítulo sobre profissionais e serviços salvos. Abas/chips para "Profissionais" e "Serviços", ordenação. Lista de cards similares ao resultado de busca, com coração ativo vermelho. Navegação inferior com Favoritos ativo. A aba de serviços favoritos aparece visualmente, mas o escopo vigente de RF010 é favoritos de perfis; não ampliar sem P16. |
| 4 | Meus serviços | Título "Meus serviços" e subtítulo de acompanhamento. Filtros por "Todos", "Aguardando resposta", "Confirmados" e "Histórico". Cards de atendimento com foto, nome, serviço, data/horário, status visual, mensagens de contexto e ações como conversar, cancelar solicitação, ver detalhes, avaliar e solicitar novamente. Esses rótulos são filtros/agrupamentos visuais, não novos estados formais. |
| 5 | Perfil | Perfil do usuário com avatar, nome, tipo e rating. Bloco verde de "dados protegidos". Lista de opções: meus dados, endereço de atendimento, notificações, segurança, privacidade, idioma, central de ajuda, falar com suporte, sair da conta. Ícones lineares e setas à direita. Navegação inferior com Perfil ativo. Idioma/suporte aparecem no protótipo, mas não devem entrar automaticamente no escopo sem decisão. |
| 6 | Criar conta | Tela de cadastro com passo visual 1 de 3. Logo, título "Crie sua conta", seletor de tipo de conta Cliente ou Profissional/Empresa, campos de nome, e-mail, telefone, senha e confirmação, aceite de termos/privacidade, botão "Criar conta" e opção Google. Google e detalhes de termos/aceite dependem de decisões; não implementar por desenho isolado. |
| 7 | Cadastro profissional/empresa | Passo 1 de 4 para prestador. Seleção Cliente vs Profissional/Empresa, dados básicos, tipo autônomo/empresa, áreas/serviços de atuação, dropdowns e seção de documentação opcional com arquivos como RG/CNH e comprovante. Botão "Continuar". Exemplos de documentos precisam de P10. |
| 8 | Chat e negociação | Conversa com Carlos Silva sobre instalação de chuveiro. Cabeçalho com foto, nota, status online e menu. Card de contexto do serviço com imagem, serviço, status, preço inicial. Mensagens em balões, card de proposta de agendamento com data/horário e botões "Aceitar proposta" e "Sugerir outro horário". Campo de mensagem, chips rápidos e botão enviar. Conversa não confirma agendamento por si só; reagendamento e contraproposta dependem de P09/P06. |

## Padrão Visual

- Paleta principal verde e verde claro, fundo muito claro, cartões brancos, destaque vermelho para alerta/status crítico e amarelo/laranja para avisos.
- Cantos arredondados, sombras suaves e composição densa de aplicativo móvel.
- Ícones simples em estilo Material/linha, com chips e badges para status.
- Hierarquia: título grande, subtítulo curto, filtros em chips, conteúdo em cards, navegação inferior fixa.
- O design é mobile-first. Não substituir por layout genérico de dashboard ou landing page.

## Antes de Alterar uma Tela

1. Verifique a página correspondente deste protótipo.
2. Compare com a implementação atual em `lib/screens`, `lib/widgets`, `lib/app/theme.dart` e assets.
3. Preserve hierarquia visual, componentes e navegação quando compatíveis com as regras.
4. Se o protótipo mostra algo ainda não aprovado, represente como pendente ou adie; não transforme em regra.
