#!/usr/bin/env node
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const { execSync } = require("child_process");

const API_URL = "http://54.82.249.2:3000"; // Replace with actual API endpoint
const ARTIFACTORY_BASE_URL = "http://3.84.194.232:8081/artifactory"; // Artifactory base URL

// Parse command-line arguments
const argv = minimist(process.argv.slice(2), {
  string: ["artifact_name", "artifact_type", "artifact_version", "local_path", "file_name", "artifactory_path", "artifactory_token"]
});


async function sayHello() {
  try {
    const response = await axios.get(`${API_URL}/Hello`);
    console.log("Server Response:", response.data);
  } catch (error) {
    console.error("Error calling Hello API:", error.message);
    process.exit(1);
  }
}

function getRepositoryPath() {
  try {
    const repoPath = execSync("git rev-parse --show-toplevel").toString().trim();
    return repoPath;
  } catch (error) {
    console.error("Error fetching repository path:", error.message);
    return null;
  }
}

async function uploadToArtifactory(local_path, file_name, artifactory_path, artifactory_token) {
  const resolvedPath = path.resolve(local_path);

  console.log(`Checking file at: ${resolvedPath}`);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File ${resolvedPath} not found`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(resolvedPath);
  const artifactTargetPath = `${ARTIFACTORY_BASE_URL}/${artifactory_path}/${file_name}`;

  try {
    console.log("DEBUG: file_name =", file_name);
    console.log("DEBUG: artifactTargetPath =", artifactTargetPath);
    console.log(`Uploading ${file_name} to Artifactory at ${artifactTargetPath}...`);
    console.log("Uploading ${file_name} to Artifactory at ${artifactTargetPath}...");
    await axios.put(artifactTargetPath, fileStream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Authorization": `Bearer ${artifactory_token}`
      }
    });
    console.log("Artifact uploaded successfully!");
    return artifactTargetPath;
  } catch (error) {
    console.error("Error uploading to Artifactory:", error.message);
    process.exit(1);
  }
}

async function publishArtifact() {
  const {
    artifact_name,
    artifact_type,
    artifact_version,
    local_path,
    file_name,
    artifactory_path,
    artifactory_token,
    initial_environment
  } = argv;

  if (!artifact_name || !artifact_type || !artifact_version || !local_path || !file_name || !artifactory_path || !artifactory_token || !initial_environment) {
    console.error("Usage: devopx publish-artifact --artifact_name=<name> --artifact_type=<type> --artifact_version=<version> --local_path=<zip_path> --file_name=<filename> --artifactory_path=<target_path> --artifactory_token=<token> --initial_environment=<initial_environment>");
    process.exit(1);
  }

  try {
    const artifact_url = await uploadToArtifactory(local_path, file_name, artifactory_path, artifactory_token);
    const artifact_repo_name = getRepositoryPath();
    console.log("Repository Path:", repoPath);
    console.log("📡 Updating artifact details in database...");
    await axios.post(`${API_URL}/publish`, {
      artifact_name,
      artifact_type,
      artifact_version,
      artifact_url,
      artifact_repo_name,
      initial_environment
    });

    console.log("Database updated successfully!");
  } catch (error) {
    console.error("Error Publishing Artifact:", error.message);
    process.exit(1);
  }
}

// Command Handling
if (argv._[0] === "publish-artifact") {
  publishArtifact();
} else if (argv._[0] === "hello") {
  sayHello();
} else {
  console.error("Invalid command. Use:\n  devopx publish-artifact --artifact_name=<name> --artifact_type=<type> --artifact_version=<version> --local_path=<zip_path> --file_name=<filename> --artifactory_path=<target_path> --artifactory_token=<token>\n  devopx hello");
  process.exit(1);
}
