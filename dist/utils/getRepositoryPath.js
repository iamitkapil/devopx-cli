"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepositoryPath = void 0;
function getRepositoryPath(type) {
    switch (type.toLowerCase()) {
        case "npm":
            return "https://artifactory.example.com/npm/";
        case "maven":
            return "https://artifactory.example.com/maven/";
        case "docker":
            return "https://artifactory.example.com/docker/";
        default:
            return "https://artifactory.example.com/generic/";
    }
}
exports.getRepositoryPath = getRepositoryPath;
