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
exports.cancelarInscricao = exports.obterInscricoes = exports.inscreverCurso = void 0;
const Inscricao_1 = __importDefault(require("../models/Inscricao"));
const AppError_1 = require("../utils/AppError");
const mongoose_1 = __importDefault(require("mongoose"));
const inscreverCurso = (_a) => __awaiter(void 0, [_a], void 0, function* ({ _idCurso, _idUser }) {
    const inscricaoExistente = yield Inscricao_1.default.findOne({ _idUser, _idCurso });
    if (inscricaoExistente) {
        throw new AppError_1.AppError('Usuário já está inscrito neste curso.', 400);
    }
    // Pegar módulos do curso para criar progresso inicial
    const curso = yield mongoose_1.default.model('Curso').findOne({ _idCurso });
    if (!curso) {
        throw new AppError_1.AppError('Curso não encontrado.', 404);
    }
    const progresso = curso.modulos.map((modulo) => ({
        _idModulo: modulo._idModulo,
        status: 0, // Não iniciado
        aulasConcluidas: [],
    }));
    const novaInscricao = new Inscricao_1.default({
        _idCurso,
        _idUser,
        progresso,
    });
    return yield novaInscricao.save();
});
exports.inscreverCurso = inscreverCurso;
const obterInscricoes = (idUser, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit; // Paginação
    const inscricoes = yield Inscricao_1.default.find({ _idUser: idUser }).limit(limit).skip(skip);
    if (inscricoes.length === 0) {
        throw new AppError_1.AppError('Nenhuma inscrição encontrada para este usuário.', 404);
    }
    return inscricoes;
});
exports.obterInscricoes = obterInscricoes;
const cancelarInscricao = (idUser, idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield Inscricao_1.default.findOneAndDelete({ _idUser: idUser, _idCurso: idCurso });
    if (!resultado) {
        throw new AppError_1.AppError('Inscrição não encontrada', 404);
    }
});
exports.cancelarInscricao = cancelarInscricao;
