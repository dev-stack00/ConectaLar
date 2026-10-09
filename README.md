# ConectaLar

O ConectaLar é um aplicativo Flutter para aproximar pessoas que precisam de serviços residenciais de profissionais autônomos e empresas. Esta versão organiza a base do aplicativo, da API e do banco de dados; as telas e os endpoints ainda são estruturas iniciais.

## Tecnologias

- Aplicativo: Flutter e Dart.
- API: PHP com respostas JSON e acesso a dados via PDO.
- Banco de dados: MySQL ou MariaDB, disponível localmente pelo XAMPP durante o desenvolvimento.
- Comunicação: Flutter → API REST PHP → MySQL. O aplicativo não acessa o banco diretamente.

## Estrutura

- `lib/app`: inicialização, rotas e tema do aplicativo.
- `lib/models`: modelos de usuário, profissional, categoria, solicitação, avaliação e mensagem.
- `lib/screens`: telas separadas por área do produto; cada uma começa com um `Scaffold` básico.
- `lib/widgets`: componentes visuais reutilizáveis.
- `lib/services`: cliente HTTP e serviços que agrupam chamadas da API.
- `lib/utils`: URL base, constantes e validadores.
- `backend/config`: conexão PDO e formato comum das respostas JSON.
- `backend/`: endpoints PHP iniciais agrupados por domínio.
- `database/conectalar.sql`: criação do banco e das nove tabelas principais.
- `test/`: teste de inicialização e navegação pelas rotas.

## Executar o Flutter

Instale o Flutter e configure um emulador Android ou simulador iOS. Na raiz do projeto, execute:

```sh
flutter pub get
flutter run
```

Para analisar o código:

```sh
flutter analyze
flutter test
```

## Configurar o XAMPP

1. Instale e abra o XAMPP.
2. Inicie os módulos **Apache** e **MySQL**.
3. Copie a pasta `backend` para `C:\xampp\htdocs\conectalar\backend` (ou para a pasta `htdocs` da sua instalação).
4. A API ficará disponível em `http://localhost/conectalar/backend`.

Os endpoints respondem com JSON. Por enquanto, cada endpoint retorna HTTP 501 para indicar que a lógica ainda será implementada.

## Criar o banco MySQL

No painel do XAMPP, abra o **phpMyAdmin**, selecione **Importar** e escolha `database/conectalar.sql`. O script cria o banco `conectalar` e as tabelas com chaves estrangeiras e índices.

Também é possível importar pelo terminal, se o cliente MySQL estiver no `PATH`:

```sh
mysql -u root < database/conectalar.sql
```

O esquema mantém o endereço do atendimento na solicitação. A API deverá ocultar esses campos para o profissional enquanto a solicitação não estiver em `aceita_agendada`. A solicitação começa em `aguardando_resposta`; só uma aceitação registrada pelo profissional deve alterar esse estado. A API também deverá permitir avaliações somente após `conclusao_confirmada`. O selo de profissional verificado deve ser calculado a partir de documento aprovado. O índice único de favoritos impede duplicatas para o mesmo cliente.

O preço armazenado é inicial. A negociação e o pagamento acontecem diretamente entre cliente e profissional; o aplicativo não processa pagamentos.

## Configurar a API PHP

`backend/config/database.php` centraliza a conexão PDO. A configuração usa as variáveis de ambiente `DB_HOST`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`. Para o XAMPP padrão, os valores de conexão são `127.0.0.1`, `conectalar`, `root` e senha vazia. Se alterar as credenciais, configure as variáveis no ambiente do Apache e reinicie o serviço. Não salve senhas no código nem no repositório.

## Conectar o Flutter à API

A URL fica centralizada em `lib/utils/constants.dart`, e as requisições JSON passam por `lib/services/api_service.dart`.

- Emulador Android: o valor inicial `http://10.0.2.2/conectalar/backend` aponta para o computador que executa o XAMPP.
- Simulador iOS: ajuste a URL base para `http://localhost/conectalar/backend`.
- Dispositivo físico: use o endereço IP local do computador e mantenha os dispositivos na mesma rede.

O Android está configurado para permitir HTTP durante o desenvolvimento local. Em produção, use HTTPS. Se conectar um dispositivo iOS a um servidor HTTP local, configure uma exceção de rede de desenvolvimento específica no projeto iOS; não habilite exceções amplas em uma versão publicada.

## Executar o projeto

Inicie Apache e MySQL, importe o SQL, confirme a URL em `lib/utils/constants.dart` e execute `flutter run`. A estrutura já separa as responsabilidades do aplicativo e da API, mas cadastro, autenticação, busca, solicitações, avaliações e demais operações ainda precisam de implementação nos endpoints e nas telas.
