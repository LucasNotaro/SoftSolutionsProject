"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarUsuario = exports.obterUsuario = exports.login = exports.cadastrar = void 0;
const usuarioService = __importStar(require("../services/usuarioService"));
const AppError_1 = require("../utils/AppError");
const cadastrar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Garante que o tipo seja ignorado se enviado no corpo da requisição
        const _a = req.body, { tipo } = _a, userData = __rest(_a, ["tipo"]);
        const { user, token } = yield usuarioService.cadastrarUsuario(userData);
        res.status(201).json({ user, token });
    }
    catch (error) {
        next(error);
    }
});
exports.cadastrar = cadastrar;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        const result = yield usuarioService.login(email, senha);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const obterUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const idUser = parseInt(req.params.idUser);
        // Verificar se o usuário autenticado está tentando acessar seu próprio perfil
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a._idUser) !== idUser) {
            throw new AppError_1.AppError('Acesso não autorizado', 403);
        }
        const usuario = yield usuarioService.obterUsuario(idUser);
        res.status(200).json(usuario);
    }
    catch (error) {
        next(error);
    }
});
exports.obterUsuario = obterUsuario;
const atualizarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const idUser = parseInt(req.params.idUser);
        // Verificar se o usuário autenticado está tentando editar seu próprio perfil
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a._idUser) !== idUser) {
            throw new AppError_1.AppError('Acesso não autorizado', 403);
        }
        const usuarioAtualizado = yield usuarioService.atualizarUsuario(idUser, req.body);
        res.status(200).json(usuarioAtualizado);
    }
    catch (error) {
        next(error);
    }
});
exports.atualizarUsuario = atualizarUsuario;
