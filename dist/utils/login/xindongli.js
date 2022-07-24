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
exports.XindongliLogin = void 0;
const axios_1 = __importDefault(require("axios"));
const login_service_1 = __importDefault(require("./login-service"));
const baseUrl = "https://www.xindongli131.xyz";
class XindongliLogin extends login_service_1.default {
    login(email, passwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${baseUrl}/auth/login`;
            const response = yield axios_1.default.post(url, {
                email,
                passwd,
                code: "",
            });
            const { data } = response;
            if (data.ret !== 1) {
                console.error(data.msg);
                throw new Error("登录失败");
            }
            return response;
        });
    }
}
exports.XindongliLogin = XindongliLogin;
