"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarEmailSuporte = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const AppError_1 = require("../utils/AppError");
const enviarEmailSuporte = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, assunto, mensagem } = data;
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_SUPPORT_USER || !process.env.EMAIL_SUPPORT_PASS || !process.env.EMAIL_SUPPORT_DESTINATION) {
        throw new AppError_1.AppError('Configurações de e-mail ausentes. Verifique as variáveis de ambiente.', 500);
    }
    // Configurar o transportador do Nodemailer para o Gmail
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com', // Servidor SMTP do Gmail
        port: 587, // Porta para conexões TLS
        secure: false, // Use 'false' para TLS
        auth: {
            user: process.env.EMAIL_SUPPORT_USER, // Seu e-mail do Gmail
            pass: process.env.EMAIL_SUPPORT_PASS, // Sua senha de aplicativo do Gmail
        },
    });
    // Testar conexão com o servidor SMTP
    try {
        yield transporter.verify();
        console.log('Servidor SMTP do Gmail pronto para envio.');
    }
    catch (error) {
        console.error('Erro na conexão com o servidor SMTP:', error);
        throw new AppError_1.AppError('Erro na conexão com o servidor SMTP.', 500);
    }
    // Montar o e-mail
    const mailOptions = {
        from: `${nome} <${process.env.EMAIL_SUPPORT_USER}>`, // Remetente
        replyTo: email, // Permite que o suporte responda ao e-mail do usuário
        to: process.env.EMAIL_SUPPORT_DESTINATION, // Destinatário (e-mail do suporte)
        subject: `Contato - ${assunto}`, // Assunto do e-mail
        text: `Mensagem de: ${nome} <${email}>\n\n${mensagem}`, // Corpo do e-mail
    };
    // Enviar o e-mail
    try {
        yield transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!');
    }
    catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        throw new AppError_1.AppError('Erro ao enviar o e-mail. Tente novamente mais tarde.', 500);
    }
});
exports.enviarEmailSuporte = enviarEmailSuporte;
