// functions.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const crypto = require('crypto');

function generateKey() {
    return crypto.randomBytes(32);
}

function encryptMessage(key, message, mode) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-' + mode, key, iv);
    let encrypted = cipher.update(message, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return { iv: iv.toString('base64'), ciphertext: encrypted };
}

// Middleware que processa o formulário
export function encryptFormData(req, res) {
    const { nome, email } = req.body;
    const key = generateKey();
    const mode = 'gcm';

    const encryptedNome = encryptMessage(key, nome, mode);
    const encryptedEmail = encryptMessage(key, email, mode);

    res.render('result', {
        title: 'Resultado da Criptografia',
        nomeCriptografado: encryptedNome.ciphertext,
        emailCriptografado: encryptedEmail.ciphertext
    });
}
