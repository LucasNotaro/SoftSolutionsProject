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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const AulaSchema = new mongoose_1.Schema({
    _idAula: { type: Number, required: true },
    nomeAula: { type: String, required: true },
    tempoAula: { type: Number, required: true },
    videoUrl: { type: String, required: true },
    materialApoio: { type: [String], default: [] },
    descricaoConteudo: { type: String, required: true },
});
const ModuloSchema = new mongoose_1.Schema({
    _idModulo: { type: Number, required: true },
    nomeModulo: { type: String, required: true },
    tempoModulo: { type: Number, required: true },
    aulas: { type: [AulaSchema], required: true },
});
const CursoSchema = new mongoose_1.Schema({
    _idCurso: { type: Number, required: true, unique: true },
    nomeCurso: { type: String, required: true },
    tempoCurso: { type: Number, required: true },
    descricaoCurta: { type: String, required: true },
    descricaoDetalhada: { type: String, required: true },
    professor: { type: String, required: true },
    categoria: { type: String, required: true },
    status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
    avaliacao: { type: Number, default: 0 },
    imagemCurso: { type: String, required: true },
    modulos: { type: [ModuloSchema], required: true },
});
exports.default = mongoose_1.default.model('Curso', CursoSchema);
/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       properties:
 *         _idCurso:
 *           type: number
 *           description: ID único do curso
 *         nomeCurso:
 *           type: string
 *           description: Nome do curso
 *         tempoCurso:
 *           type: number
 *           description: Duração total do curso em horas
 *         descricaoCurta:
 *           type: string
 *           description: Descrição curta do curso
 *         descricaoDetalhada:
 *           type: string
 *           description: Descrição detalhada do curso
 *         professor:
 *           type: string
 *           description: Nome do professor
 *         categoria:
 *           type: string
 *           description: Categoria do curso
 *         status:
 *           type: string
 *           enum: [ativo, inativo]
 *           description: Status do curso
 *         avaliacao:
 *           type: number
 *           description: Avaliação do curso
 *         imagemCurso:
 *           type: string
 *           description: URL da imagem representando o curso
 *         modulos:
 *           type: array
 *           description: Lista de módulos do curso
 *           items:
 *             type: object
 *             properties:
 *               _idModulo:
 *                 type: number
 *                 description: ID único do módulo
 *               nomeModulo:
 *                 type: string
 *                 description: Nome do módulo
 *               tempoModulo:
 *                 type: number
 *                 description: Duração total do módulo em horas
 *               aulas:
 *                 type: array
 *                 description: Lista de aulas do módulo
 *                 items:
 *                   type: object
 *                   properties:
 *                     _idAula:
 *                       type: number
 *                       description: ID único da aula
 *                     nomeAula:
 *                       type: string
 *                       description: Nome da aula
 *                     tempoAula:
 *                       type: number
 *                       description: Duração da aula em horas
 *                     videoUrl:
 *                       type: string
 *                       description: URL do vídeo da aula
 *                     materialApoio:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Links para materiais de apoio
 *                     descricaoConteudo:
 *                       type: string
 *                       description: Descrição do conteúdo da aula
 */
