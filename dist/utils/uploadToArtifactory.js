"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToArtifactory = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
async function uploadToArtifactory(local_path, file_name, artifactory_path, artifactory_token) {
    const resolvedPath = path_1.default.resolve(local_path);
    console.log(`Checking file at: ${resolvedPath}`);
    if (!fs_1.default.existsSync(resolvedPath)) {
        console.error(`Error: File ${resolvedPath} not found`);
        process.exit(1);
    }
    const fileStream = fs_1.default.createReadStream(resolvedPath);
    const artifactTargetPath = `${config_1.ARTIFACTORY_BASE_URL}/${artifactory_path}/${file_name}`;
    try {
        console.log("DEBUG: file_name =", file_name);
        console.log("DEBUG: artifactTargetPath =", artifactTargetPath);
        console.log(`Uploading ${file_name} to Artifactory at ${artifactTargetPath}...`);
        const response = await axios_1.default.put(artifactTargetPath, fileStream, {
            headers: {
                "Content-Type": "application/zip",
                "Authorization": `Bearer ${artifactory_token}`,
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        if (response.status >= 200 && response.status < 300) {
            console.log("Uploaded to Artifactory successfully.");
            return artifactTargetPath;
        }
        else {
            throw new Error(`Unexpected response code: ${response.status}`);
        }
    }
    catch (error) {
        throw new Error(`Failed to upload: ${error.message}`);
    }
}
exports.uploadToArtifactory = uploadToArtifactory;
