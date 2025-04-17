import fs from "fs";
import axios from "axios";

export async function uploadToArtifactory(
  filePath: string,
  uploadUrl: string,
  token: string
): Promise<void> {
  const fileStream = fs.createReadStream(filePath);

  try {
    const response = await axios.put(uploadUrl, fileStream, {
      headers: {
        "Content-Type": "application/zip", // adjust if your file is not zip
        "Authorization": `Bearer ${token}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("📤 Uploaded to Artifactory successfully.");
    } else {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to upload: ${error.message}`);
  }
}
