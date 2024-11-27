"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof AppError_1.AppError ? err.status : 500;
    const message = err.message || 'Erro interno do servidor';
    res.status(statusCode).json({ message });
};
exports.default = errorHandler;
