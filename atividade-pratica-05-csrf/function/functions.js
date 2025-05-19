// functions.js

// Importa o método createRequire para usar módulos do CommonJS com ES Modules
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Importa o módulo de criptografia do Node.js
const crypto = require('crypto');

// Função para gerar uma chave aleatória de 32 bytes (256 bits)
function generateKey() {
    return crypto.randomBytes(32);
}

// Função para criptografar uma mensagem usando AES-256 no modo informado
function encryptMessage(key, message, mode) {
    const iv = crypto.randomBytes(16); // Gera um vetor de inicialização (IV)
    const cipher = crypto.createCipheriv('aes-256-' + mode, key, iv); // Cria o objeto de criptografia
    let encrypted = cipher.update(message, 'utf8', 'base64'); // Criptografa parte do texto
    encrypted += cipher.final('base64'); // Finaliza a criptografia
    return { iv: iv.toString('base64'), ciphertext: encrypted }; // Retorna IV e mensagem criptografada
}

// Middleware para criptografar os dados enviados no formulário
export function encryptFormData(req, res) {
    const { nome, email } = req.body; // Obtém os dados do formulário
    const key = generateKey(); // Gera uma chave de criptografia
    const mode = 'gcm'; // Define o modo de criptografia AES-GCM

    // Criptografa nome e email
    const encryptedNome = encryptMessage(key, nome, mode);
    const encryptedEmail = encryptMessage(key, email, mode);

    // Renderiza a view com os dados criptografados
    res.render('result', {
        title: 'Resultado da Criptografia',
        nomeCriptografado: encryptedNome.ciphertext,
        emailCriptografado: encryptedEmail.ciphertext
    });
}



