"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const AppError_1 = require("../utils/AppError");
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new AppError_1.AppError('Usuário não autenticado', 401);
        }
        if (!roles.includes(req.user.tipo)) {
            throw new AppError_1.AppError('Acesso não autorizado', 403);
        }
        next();
    };
};
exports.checkRole = checkRole;
