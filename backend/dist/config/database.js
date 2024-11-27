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
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUri = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URI : process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("A variável de ambiente MONGO_URI não está definida.");
    }
    try {
        yield mongoose_1.default.connect(mongoUri);
        console.log(`Conectado ao MongoDB (${process.env.NODE_ENV})`);
    }
    catch (error) {
        console.error('Erro ao conectar ao MongoDB', error);
        process.exit(1);
    }
});
exports.default = connectDatabase;