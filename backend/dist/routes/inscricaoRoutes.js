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
// routes/inscricaoRoutes.ts
const express_1 = require("express");
const inscricaoController = __importStar(require("../controllers/inscricaoController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rotas protegidas para inscrições
router.post('/', authMiddleware_1.authMiddleware, inscricaoController.inscreverCurso);
router.get('/:idUser', authMiddleware_1.authMiddleware, inscricaoController.obterInscricoes);
router.delete('/:idUser/cursos/:idCurso', authMiddleware_1.authMiddleware, inscricaoController.cancelarInscricao);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Inscrições
 *   description: Gerenciamento de inscrições em cursos na plataforma
 */
/**
 * @swagger
 * /api/inscricoes:
 *   post:
 *     tags: [Inscrições]
 *     summary: Inscrever-se em um curso
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _idCurso:
 *                 type: number
 *                 description: ID do curso
 *               _idUser:
 *                 type: number
 *                 description: ID do usuário
 *           example:
 *             _idCurso: 1
 *             _idUser: 123
 *     responses:
 *       201:
 *         description: Inscrição realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inscricao'
 *       400:
 *         description: Usuário já está inscrito neste curso
 *       403:
 *         description: Acesso não autorizado
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
/**
 * @swagger
 * /api/inscricoes/{idUser}:
 *   get:
 *     tags: [Inscrições]
 *     summary: Obter todas as inscrições de um usuário
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Página da listagem
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Lista de inscrições retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 *       403:
 *         description: Acesso não autorizado
 *       404:
 *         description: Nenhuma inscrição encontrada para o usuário
 *       500:
 *         description: Erro interno no servidor
 */
/**
 * @swagger
 * /api/inscricoes/{idUser}/cursos/{idCurso}:
 *   delete:
 *     tags: [Inscrições]
 *     summary: Cancelar inscrição em um curso
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
 *       - in: path
 *         name: idCurso
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Inscrição cancelada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inscrição cancelada com sucesso
 *       403:
 *         description: Acesso não autorizado
 *       404:
 *         description: Inscrição não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
