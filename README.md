# 🛡️ Atividade Prática 05 - CSRF e XSS

Este projeto demonstra a criação de uma aplicação segura em Node.js utilizando Express, com proteções contra ataques **CSRF (Cross-Site Request Forgery)** e **XSS (Cross-Site Scripting)**.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- EJS
- Helmet
- express-session
- cookie-parser
- csurf

## 🔐 Segurança Implementada

- **CSRF:** Proteção com o middleware `csurf` em todas as rotas POST. O token CSRF é injetado automaticamente nas views EJS por meio de um campo oculto no formulário.
- **XSS:** Os campos de entrada são protegidos com uma função JavaScript que sanitiza os dados, impedindo scripts maliciosos. O uso do `helmet()` adiciona cabeçalhos HTTP de segurança.

## ⚙️ Como Executar o Projeto

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node index.js
   ```
4. Acesse no navegador: [http://localhost:3000](http://localhost:3000)



## 🙌 Autor

Projeto desenvolvido por Iago, estudante de Segurança no Desenvolvimento de Aplicações na FATEC Praia Grande.

## 📌 Observações

Este projeto tem fins educacionais para demonstrar práticas de segurança em aplicações web. Sempre valide e proteja dados tanto no cliente quanto no servidor.










