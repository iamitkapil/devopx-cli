"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
async function hello() {
    try {
        const response = await axios_1.default.get(`${config_1.API_URL}/Hello`);
        console.log("Server Response:", response.data);
    }
    catch (error) {
        console.error("Error calling Hello API:", error.message);
        process.exit(1);
    }
}
exports.hello = hello;
