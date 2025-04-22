"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEnvironment = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
async function registerEnvironment() {
    const filePath = path_1.default.resolve('devopx-env.json');
    if (!fs_1.default.existsSync(filePath)) {
        console.error('devopx-env.json not found in the repository root.');
        process.exit(1);
    }
    const rawData = fs_1.default.readFileSync(filePath, 'utf-8');
    const envData = JSON.parse(rawData);
    for (const env_id of Object.keys(envData)) {
        const envConfig = envData[env_id];
        const { branch, manifest_path, is_dev, is_prod, trigger_on_update, required_validations, required_environments } = envConfig;
        const payload = {
            env_id,
            branch,
            manifest_path,
            is_dev,
            is_prod,
            trigger_on_update,
            required_validations,
            required_environments
        };
        try {
            const response = await axios_1.default.post(`${config_1.API_URL}/register-environment`, payload);
            console.log(`Environment '${env_id}' registered successfully!`);
            console.log('Response:', response.data);
        }
        catch (error) {
            console.error(`Error registering environment '${env_id}':`, error.message);
        }
    }
}
exports.registerEnvironment = registerEnvironment;
