"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEnvironment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
async function registerEnvironment(args) {
    const { env_id, branch, is_dev, is_prod, trigger_on_update, required_environment, required_validations } = args;
    if (!env_id ||
        !branch ||
        typeof is_dev !== "boolean" ||
        typeof is_prod !== "boolean" ||
        typeof trigger_on_update !== "boolean" ||
        !Array.isArray(required_environment) ||
        !Array.isArray(required_validations)) {
        console.error("Missing or invalid required arguments.");
        process.exit(1);
    }
    const payload = {
        env_id,
        branch,
        is_dev,
        is_prod,
        trigger_on_update,
        required_environment,
        required_validations
    };
    try {
        const response = await axios_1.default.post(`${config_1.API_URL}/register`, payload);
        console.log(`Environment '${env_id}' registered successfully!`);
        console.log("Response:", response.data);
    }
    catch (error) {
        console.error("Error registering environment:", error.message);
        process.exit(1);
    }
}
exports.registerEnvironment = registerEnvironment;
