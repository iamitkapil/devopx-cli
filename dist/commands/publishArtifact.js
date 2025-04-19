"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishArtifact = void 0;
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const uploadToArtifactory_1 = require("../utils/uploadToArtifactory");
const getRepositoryPath_1 = require("../utils/getRepositoryPath");
const config_1 = require("../config");
async function publishArtifact(argv) {
    const { artifact_name, artifact_type, artifact_version, local_path, file_name, artifactory_path, artifactory_token, initial_environment, } = argv;
    if (!artifact_name || !artifact_type || !artifact_version ||
        !local_path || !file_name || !artifactory_path ||
        !artifactory_token || !initial_environment) {
        console.error("Missing required arguments for publish-artifact.");
        process.exit(1);
    }
    const artifactZipPath = path_1.default.resolve(local_path);
    const artifact_url = `${artifactory_path}/${file_name}`;
    const artifact_repo_name = `${(0, getRepositoryPath_1.getRepositoryPath)()}`;
    try {
        console.log("Uploading artifact to Artifactory...");
        const artifact_url = await (0, uploadToArtifactory_1.uploadToArtifactory)(local_path, file_name, artifactory_path, artifactory_token);
        const apiPayload = {
            artifact_name: artifact_name,
            artifact_type: artifact_type,
            artifact_version: artifact_version,
            artifact_url: artifact_url,
            artifact_repo_name: artifact_repo_name,
            initial_environment: initial_environment
        };
        console.log("🔍 Payload being sent to Devopx API:", JSON.stringify(apiPayload, null, 2));
        console.log("Notifying Devopx API...");
        const response = await axios_1.default.post(`${config_1.API_URL}/publish`, apiPayload);
        console.log(`Publishing ${artifact_name} successful!`);
    }
    catch (err) {
        console.error("Error publishing artifact:", err.message || err);
        process.exit(1);
    }
}
exports.publishArtifact = publishArtifact;
