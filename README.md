#  API de Autenticação e CRUD com Node.js, MongoDB e JWT

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js) ![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express) ![MongoDB](https://img.shields.io/badge/MongoDB-4.x-47A248?style=for-the-badge&logo=mongodb)

API RESTful para gerenciamento de tarefas (todos), construída com Node.js, Express e MongoDB. A aplicação inclui um sistema completo de autenticação de usuários com JWT (Access e Refresh tokens), garantindo que cada usuário só possa gerenciar suas próprias tarefas.

## ✨ Funcionalidades Principais

-   **Autenticação Segura:** Registro de usuários com senhas criptografadas (`bcryptjs`) e autenticação baseada em JWT (`accessToken` + `refreshToken`).
-   **Privacidade de Dados:** Rotas protegidas para garantir que um usuário só possa visualizar e manipular suas próprias tarefas.
-   **Operações CRUD Completas:** Funcionalidades para Criar, Ler, Atualizar e Deletar (CRUD) tarefas.
-   **Validação de Entrada:** Validação de dados em todas as rotas relevantes utilizando `Zod` para garantir a integridade das informações.
-   **Tratamento de Erros Centralizado:** Um middleware dedicado para tratamento de erros que provê respostas consistentes e claras.

## 🛠️ Tecnologias Utilizadas

-   **Backend:** Node.js, Express.js
-   **Banco de Dados:** MongoDB com Mongoose (ODM)
-   **Autenticação:** JSON Web Token (`jsonwebtoken`), `bcryptjs`
-   **Validação:** Zod

## 🚀 Configuração e Instalação

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

-   Node.js (v18 ou superior)
-   MongoDB (servidor local ou uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Instalação

1.  **Clone o repositório:**
    ```bash
      git clone https://github.com/Zacksyg/API-de-Autentica-o-e-CRUD-com-Node.js-MongoDB-e-JWT
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd todo-api
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Variáveis de Ambiente

Antes de iniciar o servidor, crie um arquivo chamado `.env` na raiz do projeto. Copie o conteúdo do arquivo `.env.example` (se houver) ou use o template abaixo, substituindo os valores conforme necessário.

```
# Porta em que o servidor irá rodar
PORT=3000

# URI de conexão com o seu banco de dados MongoDB
MONGO_URI=mongodb://localhost:27017/todo-api

# Segredos para a geração dos tokens JWT (use geradores de chaves seguras)
JWT_ACCESS_SECRET=seu_segredo_super_secreto_para_access_token
JWT_REFRESH_SECRET=seu_outro_segredo_super_secreto_para_refresh_token

# Tempos de expiração para os tokens
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Rodando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com reinicialização automática ao salvar arquivos), execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## 🧪 Testando a API com Insomnia

Para facilitar os testes, uma collection completa para o Insomnia está disponível neste repositório.

1.  **Importe os arquivos:**
    -   Abra o Insomnia, vá para **Application > Preferences > Data** e clique em **Import Data**.
    -   Importe o arquivo da collection: `docs/todo-api.collection.json`.
    -   Importe o arquivo do ambiente: `docs/todo-api.environment.json`.

2.  **Selecione o Ambiente:**
    -   No canto superior esquerdo do Insomnia, certifique-se de que o ambiente **"Desenvolvimento Local"** está selecionado.

3.  **Fluxo de Uso:**
    -   Use a requisição `[POST] Register User` para criar uma conta.
    -   Execute `[POST] Login` para obter seu `accessToken` e `refreshToken` (eles serão salvos automaticamente no ambiente).
    -   Agora você pode usar todas as outras requisições protegidas, pois o token será anexado automaticamente.

## 📖 Endpoints da API

A URL base para todos os endpoints é `http://localhost:3000`.

### Autenticação (`/auth`)

| Método | Rota             | Descrição                                         | Protegido |
| :----- | :--------------- | :------------------------------------------------ | :-------- |
| `POST` | `/auth/register` | Registra um novo usuário.                         | Não       |
| `POST` | `/auth/login`    | Autentica um usuário e retorna `accessToken` e `refreshToken`. | Não       |
| `POST` | `/auth/refresh`  | Gera um novo `accessToken` usando um `refreshToken`.| Não       |

### Usuários (`/users`)

| Método | Rota        | Descrição                        | Protegido |
| :----- | :---------- | :------------------------------- | :-------- |
| `GET`  | `/users/me` | Retorna os dados do usuário logado.| Sim       |

### Tarefas (`/todos`)

| Método   | Rota         | Descrição                            | Protegido |
| :------- | :----------- | :----------------------------------- | :-------- |
| `POST`   | `/todos`     | Cria uma nova tarefa para o usuário logado. | Sim       |
| `GET`    | `/todos`     | Lista todas as tarefas do usuário logado. | Sim       |
| `GET`    | `/todos/:id` | Obtém uma tarefa específica pelo seu ID. | Sim       |
| `PUT`    | `/todos/:id` | Atualiza uma tarefa específica.      | Sim       |
| `DELETE` | `/todos/:id` | Deleta uma tarefa específica.        | Sim       |
