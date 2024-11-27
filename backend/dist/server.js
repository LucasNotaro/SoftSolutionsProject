"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const inscricaoRoutes_1 = __importDefault(require("./routes/inscricaoRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const swagger_1 = require("./config/swagger");
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const cursoRoutes_1 = __importDefault(require("./routes/cursoRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
;
(0, swagger_1.setupSwagger)(app);
// Middlewares globais
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Conexão com o banco de dados
(0, database_1.default)();
// Rotas
app.use('/api/inscricoes', inscricaoRoutes_1.default);
app.use('/api/usuarios', usuarioRoutes_1.default);
app.use('/api/email', emailRoutes_1.default);
app.use('/api/cursos', cursoRoutes_1.default);
// Middleware de erro (mantenha por último)
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse a API em: http://localhost:${PORT}`);
});
exports.default = app;
