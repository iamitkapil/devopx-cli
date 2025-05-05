"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepositoryPath = void 0;
const child_process_1 = require("child_process");
function getRepositoryPath() {
    try {
        const remoteUrl = (0, child_process_1.execSync)("git config --get remote.origin.url").toString().trim();
        const match = remoteUrl.match(/github\.com[/:](.+\/.+?)(\.git)?$/);
        if (match && match[1]) {
            return match[1];
        }
        else {
            console.error("Could not extract GitHub repo path from remote URL");
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching repository path:", error.message);
        return null;
    }
}
exports.getRepositoryPath = getRepositoryPath;
