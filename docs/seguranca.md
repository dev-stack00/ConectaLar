# Segurança — fundação da API

- Arquivos `.env` e `.env.*` ficam fora do Git, exceto `.env.example`, permitido somente com nomes e valores não secretos.
- Configuração inválida falha antes de abrir o servidor e as mensagens não repetem valores de ambiente.
- A resposta de saúde expõe somente o estado genérico `ok`.
- Erros HTTP não devolvem mensagens internas, stacks ou corpo original da exceção.
- Logs HTTP não incluem corpo, headers, URL, mensagens de exceção ou stack traces.
- Nenhuma conexão de banco, credencial, serviço externo ou integração está ativa nesta fundação.
- A busca por segredos realizada antes do baseline é heurística; repetir com um scanner dedicado antes de publicar ou integrar ao remoto.
