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
async function publishArtifact(argv) {
    const { artifact_name, artifact_type, artifact_version, local_path, file_name, artifactory_path, artifactory_token, initial_environment, } = argv;
    if (!artifact_name || !artifact_type || !artifact_version ||
        !local_path || !file_name || !artifactory_path ||
        !artifactory_token || !initial_environment) {
        console.error("Missing required arguments for publish-artifact.");
        process.exit(1);
    }
    const artifactZipPath = path_1.default.resolve(local_path);
    const destinationPath = `${artifactory_path}/${file_name}`;
    const uploadUrl = `${(0, getRepositoryPath_1.getRepositoryPath)(artifact_type)}${destinationPath}`;
    try {
        console.log("📦 Uploading artifact to Artifactory...");
        await (0, uploadToArtifactory_1.uploadToArtifactory)(artifactZipPath, uploadUrl, artifactory_token);
        const apiPayload = {
            name: artifact_name,
            type: artifact_type,
            version: artifact_version,
            file: file_name,
            path: destinationPath,
            initial_environment,
        };
        console.log("🚀 Notifying Devopx API...");
        const apiUrl = "https://devopx.example.com/api/artifacts"; // replace with actual endpoint
        await axios_1.default.post(apiUrl, apiPayload);
        console.log("✅ Artifact published successfully.");
    }
    catch (err) {
        console.error("❌ Error publishing artifact:", err.message || err);
        process.exit(1);
    }
}
exports.publishArtifact = publishArtifact;
