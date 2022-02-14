# DocatoTestServer

API REST em Node.js.

# EndPoints
GET: /api/user - Lista de usuários
GET: /api/user/:id - Retorna usuário correspondente ao id
POST: /api/user/ - Cria usuário
PUT: /api/user/ - Atualiza usuário
DELETE: /api/user/:id - Remove usuário

* Importante: Para realizar as operações de atualização e criação de usuários é necessário informar os seguintes parâmetrosÇ
 - name
 - username
 - password
 - email
 - cpf

# Funcionalidades

Operações de inserção, atualização, remoção e visualização de usuários.

Visizalização dos produtos gerados pelo crawler.

# Requisitos

Node.js
PostgresSQL

# Observações

Ao rodar o servidor, a aplicação fará a comunicação com o database. Gerando a tabela no banco e criando um usuário padrão

Usuario: admin
Senha: admin

* Importante que o usuario e senha do postgresSQL seja o mesmo definido em './infra/database.js'. Caso forem divergentes, efetuar a troca no mesmo.

* Importante caso seja feito a troca de portas da aplicação, é necessário também realizar a troca em './index.js' linha 27 para que não ocorra problemas de CORS