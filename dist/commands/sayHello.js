"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = "http://34.207.164.161:3000"; // Replace with your actual API URL
async function sayHello() {
    try {
        const response = await axios_1.default.get(`${API_URL}/Hello`);
        console.log("Server Response:", response.data);
    }
    catch (error) {
        console.error("Error calling Hello API:", error.message);
        process.exit(1);
    }
}
exports.sayHello = sayHello;
