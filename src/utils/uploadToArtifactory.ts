import fs from "fs";
import axios from "axios";
import path from "path";
import { ARTIFACTORY_BASE_URL } from '../config';


export async function uploadToArtifactory(
  local_path: string,
  file_name: string,
  artifactory_path: string,
  artifactory_token: string
): Promise<string> {

  const resolvedPath = path.resolve(local_path);

  console.log(`Checking file at: ${resolvedPath}`);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File ${resolvedPath} not found`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(resolvedPath );
  const artifactTargetPath = `${ARTIFACTORY_BASE_URL}/${artifactory_path}/${file_name}`;

  try {
    console.log("DEBUG: file_name =", file_name);
    console.log("DEBUG: artifactTargetPath =", artifactTargetPath);
    console.log(`Uploading ${file_name} to Artifactory at ${artifactTargetPath}...`);
    const response = await axios.put(artifactTargetPath, fileStream, {
      headers: {
        "Content-Type": "application/zip", // adjust if your file is not zip
        "Authorization": `Bearer ${artifactory_token}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("Uploaded to Artifactory successfully.");
      return artifactTargetPath;
    } else {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to upload: ${error.message}`);
  }
}
