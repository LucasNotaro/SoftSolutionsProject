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
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarEmail = void 0;
const emailService_1 = require("../services/emailService");
const enviarEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, assunto, mensagem } = req.body;
        // Validação dos campos obrigatórios
        if (!nome || !email || !assunto || !mensagem) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }
        // Enviar o e-mail
        yield (0, emailService_1.enviarEmailSuporte)({ nome, email, assunto, mensagem });
        // Retornar sucesso
        return res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    }
    catch (error) {
        next(error); // Delegar o erro ao middleware de erro
    }
});
exports.enviarEmail = enviarEmail;
