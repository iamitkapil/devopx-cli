import fs from "fs";
import path from "path";
import axios from "axios";
import { uploadToArtifactory } from "../utils/uploadToArtifactory";
import { getRepositoryPath } from "../utils/getRepositoryPath";

export interface PublishArgs {
  artifact_name: string;
  artifact_type: string;
  artifact_version: string;
  local_path: string;
  file_name: string;
  artifactory_path: string;
  artifactory_token: string;
  initial_environment: string;
}

export async function publishArtifact(argv: Partial<PublishArgs>) {
  const {
    artifact_name,
    artifact_type,
    artifact_version,
    local_path,
    file_name,
    artifactory_path,
    artifactory_token,
    initial_environment,
  } = argv;

  if (
    !artifact_name || !artifact_type || !artifact_version ||
    !local_path || !file_name || !artifactory_path ||
    !artifactory_token || !initial_environment
  ) {
    console.error("Missing required arguments for publish-artifact.");
    process.exit(1);
  }

  const artifactZipPath = path.resolve(local_path);
  const destinationPath = `${artifactory_path}/${file_name}`;
  const uploadUrl = `${getRepositoryPath(artifact_type)}${destinationPath}`;

  try {
    console.log("📦 Uploading artifact to Artifactory...");
    await uploadToArtifactory(artifactZipPath, uploadUrl, artifactory_token);

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

    await axios.post(apiUrl, apiPayload);

    console.log("✅ Artifact published successfully.");
  } catch (err: any) {
    console.error("❌ Error publishing artifact:", err.message || err);
    process.exit(1);
  }
}
