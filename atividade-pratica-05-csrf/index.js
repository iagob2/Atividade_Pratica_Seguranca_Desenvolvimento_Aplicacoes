// Importa os módulos necessários
import express from 'express'; // Framework web
import session from 'express-session'; // Gerenciamento de sessões
import cookieParser from 'cookie-parser'; // Manipulação de cookies
import csrf from 'csurf'; // Proteção contra ataques CSRF
import helmet from 'helmet'; // Define headers de segurança
import path from 'path'; // Manipula caminhos de diretórios
import { fileURLToPath } from 'url'; // Utilizado para compatibilidade com ES Modules
import { encryptFormData } from './function/functions.js';


// Converte a URL do arquivo atual para um caminho de arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa o app Express
const app = express();
const port = 3000;

// --------------------- SEGURANÇA ---------------------

// Middleware Helmet para proteger contra várias vulnerabilidades comuns (XSS, clickjacking, etc.)
app.use(helmet());

// Permite ao servidor interpretar dados enviados em JSON
app.use(express.json());

// Permite ao servidor interpretar dados enviados via formulário
app.use(express.urlencoded({ extended: true }));

// Middleware para manipular cookies
app.use(cookieParser());

// --------------------- SESSÕES ---------------------

// Configura o uso de sessões para o usuário
app.use(session({
    secret: 'chave-secreta', // Chave usada para assinar os cookies da sessão
    resave: false, // Não salva a sessão se ela não foi modificada
    saveUninitialized: false, // Não salva sessões novas não inicializadas
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Apenas envia cookies por HTTPS em produção
        httpOnly: true, // O cookie não pode ser acessado via JavaScript (evita XSS)
        sameSite: 'strict' // Impede envio de cookies por sites externos (protege contra CSRF)
    }
}));

// --------------------- PROTEÇÃO CSRF ---------------------

// Inicializa o middleware de proteção CSRF com cookies
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection); // Aplica globalmente (poderia aplicar só em rotas POST se preferir)

// --------------------- CONFIGURAÇÃO DE VIEW (EJS) ---------------------

// Define EJS como motor de templates
app.set('view engine', 'ejs');

// Define a pasta onde estão os arquivos de view (templates)
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use('/style', express.static(path.join(__dirname, 'style')));

// Middleware para injetar o token CSRF automaticamente em todas as views
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // Gera o token e passa pra view
    next();
});

// --------------------- ROTAS ---------------------

// Rota GET principal (página inicial)
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Página Segura do Iago ',
        message: 'Bem-vindo à aplicação segura!'
    });
});

// importa e monta o roteador da pasta function
app.use('/funcao',encryptFormData);

// Rota POST para envio de formulário protegido
app.post('/submit', csrfProtection, encryptFormData, (req, res) => {
    // Aqui poderia processar os dados recebidos do formulário
  

    console.log('Dados recebidos:', req.body);
    res.redirect('/funcao'); // <-- aqui redireciona para a rota montada
});

// --------------------- INICIALIZA O SERVIDOR ---------------------

// Inicia o servidor e escuta na porta definida
let data = new Date();
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Data e hora atual: ${data}`);
});
