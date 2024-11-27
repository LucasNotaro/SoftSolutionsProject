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
exports.disconnectTestDatabase = exports.connectTestDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectTestDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUri = 'mongodb://localhost:27017/softsolutions_test';
    try {
        yield mongoose_1.default.connect(mongoUri, { dbName: 'softsolutions_test' });
        console.log('Conectado ao MongoDB (testes)');
    }
    catch (error) {
        console.error('Erro ao conectar ao MongoDB (testes)', error);
        process.exit(1);
    }
});
exports.connectTestDatabase = connectTestDatabase;
const disconnectTestDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase(); // Limpa os dados após cada teste
    yield mongoose_1.default.disconnect();
});
exports.disconnectTestDatabase = disconnectTestDatabase;
