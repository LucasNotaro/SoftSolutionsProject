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
exports.atualizarUsuario = exports.obterUsuario = exports.login = exports.cadastrarUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const AppError_1 = require("../utils/AppError");
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';
// gerar token JWT
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ _idUser: user._idUser, tipo: user.tipo }, JWT_SECRET, { expiresIn: '24h' });
};
const cadastrarUsuario = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validação de CPF
    if (!validarCPF(String(userData.cpfUsuario))) {
        throw new AppError_1.AppError('CPF inválido. Por favor, insira um CPF válido no formato ###.###.###-##', 400);
    }
    // Validação de formato do e-mail
    if (!validarEmail(String(userData.email))) {
        throw new AppError_1.AppError('Formato de email inválido. Por favor, insira um email válido.', 400);
    }
    // Validação de formato de telefone
    if (userData.telefone) {
        if (!validarTelefone(userData.telefone)) {
            throw new AppError_1.AppError('Formato de telefone inválido. Insira um número com 10 ou 11 dígitos.', 400);
        }
        userData.telefone = formatarTelefone(userData.telefone); // Formata o telefone
    }
    try {
        // Verificar se o e-mail já está cadastrado
        const emailExistente = yield Usuario_1.default.findOne({ email: userData.email });
        if (emailExistente) {
            throw new AppError_1.AppError('Email já cadastrado. Por favor, use outro email.', 400);
        }
        // Gerar ID único
        const lastUser = yield Usuario_1.default.findOne().sort({ _idUser: -1 });
        const _idUser = ((lastUser === null || lastUser === void 0 ? void 0 : lastUser._idUser) || 0) + 1;
        // Hash da senha
        const hashedPassword = yield bcrypt_1.default.hash(userData.senha, 10);
        // Força o tipo como aluno
        const novoUsuario = new Usuario_1.default(Object.assign(Object.assign({}, userData), { _idUser, tipo: 'aluno', senha: hashedPassword }));
        const user = yield novoUsuario.save();
        const token = generateToken({ _idUser: user._idUser, tipo: user.tipo });
        return { user, token };
    }
    catch (error) {
        if (error.code === 11000 && ((_a = error.keyPattern) === null || _a === void 0 ? void 0 : _a.cpfUsuario)) {
            throw new AppError_1.AppError('CPF já cadastrado. Por favor, use outro CPF.', 400);
        }
        throw error;
    }
});
exports.cadastrarUsuario = cadastrarUsuario;
const login = (email, senha) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Usuario_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError('Email ou senha inválidos', 401);
    }
    const senhaValida = yield bcrypt_1.default.compare(senha, user.senha);
    if (!senhaValida) {
        throw new AppError_1.AppError('Email ou senha inválidos', 401);
    }
    const token = generateToken({ _idUser: user._idUser, tipo: user.tipo });
    return { user, token };
});
exports.login = login;
const obterUsuario = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Usuario_1.default.findOne({ _idUser: idUser });
    if (!usuario) {
        throw new AppError_1.AppError('Usuário não encontrado', 404);
    }
    return usuario;
});
exports.obterUsuario = obterUsuario;
const atualizarUsuario = (idUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioAtual = yield Usuario_1.default.findOne({ _idUser: idUser });
    if (!usuarioAtual) {
        throw new AppError_1.AppError('Usuário não encontrado', 404);
    }
    // Bloquear alteração de CPF
    if ('cpfUsuario' in data && data.cpfUsuario !== usuarioAtual.cpfUsuario) {
        throw new AppError_1.AppError('Não é permitido alterar o CPF', 400);
    }
    // Validação de e-mail
    if (data.email && !validarEmail(data.email)) {
        throw new AppError_1.AppError('Formato de email inválido', 400);
    }
    // Validação e formatação do telefone
    if (data.telefone) {
        if (!validarTelefone(data.telefone)) {
            throw new AppError_1.AppError('Formato de telefone inválido. Insira um número com 10 ou 11 dígitos.', 400);
        }
        // Substitui o telefone pelo valor formatado
        data.telefone = formatarTelefone(data.telefone);
    }
    const usuarioAtualizado = yield Usuario_1.default.findOneAndUpdate({ _idUser: idUser }, data, { new: true });
    return usuarioAtualizado;
});
exports.atualizarUsuario = atualizarUsuario;
// Validação de CPF
const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
        return false;
    let soma = 0;
    for (let i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        resto = 0;
    if (resto !== parseInt(cpf.charAt(9)))
        return false;
    soma = 0;
    for (let i = 0; i < 10; i++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        resto = 0;
    return resto === parseInt(cpf.charAt(10));
};
// Validação de E-mail
const validarEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};
const validarTelefone = (telefone) => {
    // Remove caracteres não numéricos
    const somenteNumeros = telefone.replace(/\D/g, '');
    // Verifica se o número tem 10 ou 11 dígitos
    return somenteNumeros.length === 10 || somenteNumeros.length === 11;
};
const formatarTelefone = (telefone) => {
    // Remove caracteres não numéricos
    const somenteNumeros = telefone.replace(/\D/g, '');
    if (somenteNumeros.length === 11) {
        // Formata celular com DDD: (11) 91234-5678
        return somenteNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    else if (somenteNumeros.length === 10) {
        // Formata fixo com DDD: (11) 1234-5678
        return somenteNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    // Retorna o telefone sem formatação se inválido
    return telefone;
};
