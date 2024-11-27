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
// models/Inscricao.ts
const mongoose_1 = __importStar(require("mongoose"));
const ProgressoModuloSchema = new mongoose_1.Schema({
    _idModulo: { type: Number, required: true },
    status: { type: Number, required: true, default: 0 }, // Padrão: Não iniciado
    aulasConcluidas: { type: [Number], default: [] }, // IDs das aulas concluídas
});
const InscricaoSchema = new mongoose_1.Schema({
    _idUser: { type: Number, required: true },
    _idCurso: { type: Number, required: true },
    progresso: { type: [ProgressoModuloSchema], required: true },
    dataInscricao: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Inscricao', InscricaoSchema);
/**
 * @swagger
 * components:
 *   schemas:
 *     Inscricao:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único da inscrição gerado pelo MongoDB
 *         _idUser:
 *           type: number
 *           description: ID do usuário inscrito
 *         _idCurso:
 *           type: number
 *           description: ID do curso ao qual pertence
 *         progresso:
 *           type: array
 *           description: Progresso do usuário em cada módulo do curso
 *           items:
 *             type: object
 *             properties:
 *               _idModulo:
 *                 type: number
 *                 description: ID do módulo
 *               status:
 *                 type: number
 *                 description: Status do módulo (0 = Não iniciado, 1 = Em andamento, 2 = Concluído)
 *               aulasConcluidas:
 *                 type: array
 *                 description: IDs das aulas concluídas pelo usuário
 *                 items:
 *                   type: number
 *         dataInscricao:
 *           type: string
 *           format: date-time
 *           description: Data e hora da inscrição
 */
