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
const express_1 = require("express");
const cursoController = __importStar(require("../controllers/cursoController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
// Adicionar curso (somente administradores)
router.post('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['administrador']), cursoController.adicionarCurso);
// Obter todos os cursos (rota pública)
router.get('/', cursoController.obterCursos);
//Obter um curso específico (rota pública)
router.get('/:idCurso', cursoController.obterCursos);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gerenciamento de cursos na plataforma
 */
/**
 * @swagger
 * /api/cursos:
 *   post:
 *     tags: [Cursos]
 *     summary: Adicionar um novo curso
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *           example:
 *             nomeCurso: "Python para Análise de Dados"
 *             tempoCurso: 60
 *             descricaoCurta: "Aprenda a usar Python."
 *             descricaoDetalhada: "Ideal para quem deseja se destacar na área de dados."
 *             professor: "Ana Costa"
 *             categoria: "Data Science"
 *             status: "ativo"
 *             avaliacao: 4.9
 *             imagemCurso: "https://raw.githubusercontent.com/SoftSolutionsProject/img/refs/heads/main/cards/1.png"
 *             modulos:
 *               - nomeModulo: "Módulo 1: Fundamentos de Análise de Dados"
 *                 tempoModulo: 15
 *                 aulas:
 *                   - nomeAula: "Introdução à Análise de Dados"
 *                     tempoAula: 1.5
 *                     videoUrl: "https://www.youtube.com/watch?v=O9vhXA5uA_4&ab_channel=pyPRO"
 *                     materialApoio: []
 *                     descricaoConteudo: "Uma visão geral sobre o que é análise de dados."
 *     responses:
 *       201:
 *         description: Curso adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Erro de validação ou estrutura incorreta
 *       403:
 *         description: Acesso não autorizado
 *       500:
 *         description: Erro no servidor
 */
/**
 * @swagger
 * /api/cursos:
 *   get:
 *     tags: [Cursos]
 *     summary: Obter todos os cursos
 *     description: Retorna uma lista de todos os cursos cadastrados na plataforma.
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       500:
 *         description: Erro interno do servidor.
 */
/**
 * @swagger
 * /api/cursos/{idCurso}:
 *   get:
 *     tags: [Cursos]
 *     summary: Obter um curso específico
 *     description: Retorna os detalhes de um curso com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: idCurso
 *         required: true
 *         schema:
 *           type: number
 *         description: ID único do curso a ser obtido.
 *     responses:
 *       200:
 *         description: Detalhes do curso retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor.
 */
