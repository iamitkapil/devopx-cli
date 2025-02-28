#!/usr/bin/env node

const axios = require("axios");

const API_URL = "https://3.86.211.23:3000"; // Replace with actual API URL
const args = process.argv.slice(2);

async function publishArtifact() {
  if (args.length < 3) {
    console.error("Usage: devopx publish <artifact_name> <artifact_type> <artifact_version>");
    process.exit(1);
  }

  const [artifact_name, artifact_type, artifact_version] = args;

  try {
    const response = await axios.post(`${API_URL}/publish`, {
      artifact_name,
      artifact_type,
      artifact_version
    });

    console.log("Artifact Published:", response.data);
  } catch (error) {
    console.error("Error Publishing Artifact:", error.response ? error.response.data : error.message);
  }
}

// Check CLI Command
if (args[0] === "publish") {
  publishArtifact();
} else {
  console.error("Invalid command. Use: devopx publish <artifact_name> <artifact_type> <artifact_version>");
}
