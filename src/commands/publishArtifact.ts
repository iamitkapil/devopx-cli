import path from "path";
import axios from "axios";
import { uploadToArtifactory } from "../utils/uploadToArtifactory";
import { getRepositoryPath } from "../utils/getRepositoryPath";
import { API_URL } from '../config';

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
  const artifact_url = `${artifactory_path}/${file_name}`;
  const artifact_repo_name = `${getRepositoryPath()}`;

  try {
    console.log("Uploading artifact to Artifactory...");
    const artifact_url =await uploadToArtifactory(local_path, file_name, artifactory_path, artifactory_token);

    const apiPayload = {
      artifact_name: artifact_name,
      artifact_type: artifact_type,
      artifact_version: artifact_version,
      artifact_url: artifact_url,
      artifact_repo_name: artifact_repo_name,
      initial_environment:initial_environment
    };

    console.log(" Payload being sent to Devopx API:", JSON.stringify(apiPayload, null, 2));
    console.log("Notifying Devopx API...");
    
    const response = await axios.post(`${API_URL}/publish`, apiPayload);
    console.log(`Publishing ${artifact_name} successful!`);
    
  } catch (err: any) {
    console.error("Error publishing artifact:", err.message || err);
    process.exit(1);
  }
}
