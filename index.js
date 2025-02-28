#!/usr/bin/env node

const axios = require("axios");

const API_URL = "http://3.86.147.92:3000"; // Replace with actual API endpoint

const args = process.argv.slice(2); // Now args is defined

async function sayHello() {
  try {
    const response = await axios.get(`${API_URL}/Hello`);
    console.log("Server Response:", response.data);
  } catch (error) {
    console.error("Error calling Hello API:", error.message);
  }
}

async function publishArtifact(args) {  // Pass args as a function parameter
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

// Command Handling
if (args[0] === "publish") {
  publishArtifact(args.slice(1));  //  Pass only the required arguments
} else if (args[0] === "hello") {
  sayHello();
} else {
  console.error("Invalid command. Use: \n - devopx publish <artifact_name> <artifact_type> <artifact_version>\n - devopx hello");
}
