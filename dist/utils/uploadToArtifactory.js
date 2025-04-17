"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToArtifactory = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
async function uploadToArtifactory(filePath, uploadUrl, token) {
    const fileStream = fs_1.default.createReadStream(filePath);
    try {
        const response = await axios_1.default.put(uploadUrl, fileStream, {
            headers: {
                "Content-Type": "application/zip",
                "Authorization": `Bearer ${token}`,
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        if (response.status >= 200 && response.status < 300) {
            console.log("📤 Uploaded to Artifactory successfully.");
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
