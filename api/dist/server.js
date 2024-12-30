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
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const env_1 = require("./config/env");
const swagger_1 = __importDefault(require("./utils/swagger"));
function initSever() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("soy process", (0, env_1.EnvConfig)().DATABASE);
        let connection = null;
        try {
            connection = yield mongoose_1.default
                // .connect(String(process.env.DATABASE))
                .connect('mongodb+srv://eduardoasm19:edu123456@cluster0.rfekn.mongodb.net/')
                .then((conn) => {
                console.log('Connected to database');
                return conn;
            });
            mongoose_1.default.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);
            const PORT = Number(3000);
            const httpServer = http_1.default.createServer(app_1.default);
            yield new Promise((resolve) => {
                httpServer.listen({ port: PORT }, resolve);
                (0, swagger_1.default)(app_1.default, PORT);
            });
            console.log(`🚀 Server ready at http://localhost:${PORT}`);
        }
        catch (err) {
            if (connection) {
                connection.connection.close();
            }
            console.log(err);
            process.exit(1);
        }
    });
}
initSever();
