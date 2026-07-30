# 🛡️ Bullying Denúncia

Sistema Full Stack desenvolvido para oferecer um canal seguro e anônimo de denúncias de bullying em instituições de ensino.

O projeto permite que estudantes realizem denúncias sem revelar sua identidade e acompanhem o andamento do caso através de um protocolo único. A equipe responsável possui um painel administrativo para analisar, atualizar e gerenciar todas as denúncias.

> Projeto desenvolvido como parte da minha evolução como Desenvolvedor Full Stack.

---

# 📷 Demonstração

> Em breve

Frontend:
(Adicionar URL da Render)

Backend API:
https://bullyingdenuncia-api.onrender.com/api

---

# ✨ Funcionalidades

## 👨‍🎓 Área do Estudante

- Cadastro de denúncias anônimas
- Geração automática de protocolo
- Acompanhamento da denúncia
- Visualização do status
- Mensagens enviadas pela secretaria
- Sistema de comentários
- Visualização de notícias

---

## 🏫 Área Administrativa

- Login com autenticação JWT
- Listagem de denúncias
- Atualização do status
- Envio de mensagens ao estudante
- Exclusão de denúncias
- Gerenciamento de comentários
- Gerenciamento de notícias

---

# 🖥️ Tecnologias

## Front-end

- React
- React Router
- JavaScript
- HTML5
- CSS3
- Vite

## Back-end

- Node.js
- Express
- JWT
- Bcrypt
- PostgreSQL

## Banco de Dados

- PostgreSQL

## Versionamento

- Git
- GitHub

---

# 📂 Estrutura do Projeto

```
bullying/
│
├── backend/
│
└── frontend-react/
```

---

# 🔒 Segurança

O sistema possui:

- Autenticação JWT
- Hash de senhas
- Rotas protegidas
- Validação de dados
- Comunicação via API REST
- Separação entre área pública e administrativa

---

# 🚀 Como executar

## Clonar

```bash
git clone https://github.com/GabrielAraujodevcode/bullyingdenuncia.git
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend-react
npm install
npm run dev
```

---

# 🌐 API

```
https://bullyingdenuncia-api.onrender.com/api
```

Principais endpoints:

```
POST /auth/login

POST /denuncias

GET /denuncias

GET /denuncias/protocolo/:protocolo

PUT /denuncias/:id

DELETE /denuncias/:id

GET /comentarios

POST /comentarios

DELETE /comentarios/:id

GET /noticias

POST /noticias

DELETE /noticias/:id
```

---

# 💡 Objetivo

Mais do que um projeto acadêmico, este sistema foi desenvolvido pensando em uma necessidade real das instituições de ensino: oferecer um ambiente mais seguro para que estudantes possam denunciar situações de bullying sem medo de exposição.

O projeto representa minha evolução prática em desenvolvimento Full Stack, aplicando conceitos de arquitetura de software, APIs REST, autenticação, banco de dados, React e integração completa entre frontend e backend.

---

# 📬 Contato

**Gabriel Henrique de Araújo Silva**

📧 ghdas.gabriel@gmail.com

💼 LinkedIn

https://www.linkedin.com/in/gabriel-araujo

🐙 GitHub

https://github.com/GabrielAraujodevcode

---

## ⭐ Se este projeto foi útil, deixe uma estrela no repositório!