"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEnvironment = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = "http://34.207.164.161:3000";
async function registerEnvironment(args) {
    const { environment_name, environment_type, region, account, global } = args;
    if (!environment_name || !environment_type || !region || !account || !global) {
        console.error("Missing required arguments.");
        process.exit(1);
    }
    const payload = {
        environment_name,
        environment_type,
        region,
        account,
        global,
    };
    try {
        const response = await axios_1.default.post(`${API_URL}/register`, payload);
        console.log(`Environment '${environment_name}' registered successfully!`);
        console.log("Environment ID:", response.data?.data?.environment_id || "Not returned");
    }
    catch (error) {
        console.error("Error registering environment:", error.message);
        process.exit(1);
    }
}
exports.registerEnvironment = registerEnvironment;
