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
exports.obterTodosCursos = exports.obterCursoPorId = exports.adicionarCurso = void 0;
const Curso_1 = __importDefault(require("../models/Curso"));
const adicionarCurso = (cursoData) => __awaiter(void 0, void 0, void 0, function* () {
    // Gerar _idCurso automaticamente
    const ultimoCurso = yield Curso_1.default.findOne().sort({ _idCurso: -1 });
    const novoIdCurso = ultimoCurso ? ultimoCurso._idCurso + 1 : 1;
    // Gerar _idModulo e _idAula para cada módulo e aula
    cursoData.modulos = cursoData.modulos.map((modulo, indexModulo) => {
        const _idModulo = novoIdCurso * 100 + (indexModulo + 1); // IDs baseados no curso
        modulo._idModulo = _idModulo;
        modulo.aulas = modulo.aulas.map((aula, indexAula) => {
            aula._idAula = _idModulo * 100 + (indexAula + 1); // IDs baseados no módulo
            return aula;
        });
        return modulo;
    });
    // Criar o curso
    const novoCurso = new Curso_1.default(Object.assign({ _idCurso: novoIdCurso }, cursoData));
    return yield novoCurso.save();
});
exports.adicionarCurso = adicionarCurso;
//Obter um curso por ID
const obterCursoPorId = (idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Curso_1.default.findOne({ _idCurso: idCurso });
});
exports.obterCursoPorId = obterCursoPorId;
//Obter todos os cursos
const obterTodosCursos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Curso_1.default.find();
});
exports.obterTodosCursos = obterTodosCursos;
