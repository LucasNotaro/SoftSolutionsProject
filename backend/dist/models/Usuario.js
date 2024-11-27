"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UsuarioSchema = new mongoose_1.default.Schema({
    _idUser: { type: Number, required: true, unique: true },
    tipo: { type: String, enum: ['administrador', 'aluno'], required: true, default: 'aluno' },
    nomeUsuario: { type: String, required: true, index: true },
    cpfUsuario: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String },
    endereco: {
        rua: { type: String },
        numero: { type: String },
        bairro: { type: String },
        cidade: { type: String },
        estado: { type: String },
        pais: { type: String },
    },
    localizacao: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
});
exports.default = mongoose_1.default.model('Usuario', UsuarioSchema);
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _idUser:
 *           type: number
 *         tipo:
 *           type: string
 *           enum: [administrador, aluno]
 *         nomeUsuario:
 *           type: string
 *         cpfUsuario:
 *           type: string
 *         senha:
 *           type: string
 *           format: password
 *         email:
 *           type: string
 *           format: email
 *         telefone:
 *           type: string
 *         endereco:
 *           type: object
 *           properties:
 *             rua:
 *               type: string
 *             numero:
 *               type: string
 *             bairro:
 *               type: string
 *             cidade:
 *               type: string
 *             estado:
 *               type: string
 *             pais:
 *               type: string
 *     Inscricao:
 *       type: object
 *       properties:
 *         statusInscricao:
 *           type: number
 *         _idModulo:
 *           type: number
 *         _idUser:
 *           type: number
 *         dataInscricao:
 *           type: string
 *           format: date-time
 */
