#!/usr/bin/env node

const axios = require("axios");

const API_URL = "https://3.86.211.23:3000"; // Replace with actual API endpoint

async function callAPI() {
    try {
        const response = await axios.get(`${API_URL}/`);
        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error calling Devopx API:", error.message);
    }
}

callAPI();