import axios from "axios";

const API_URL = "http://34.207.164.161:3000"; // Replace with your actual API URL

export async function sayHello(): Promise<void> {
  try {
    const response = await axios.get(`${API_URL}/Hello`);
    console.log("Server Response:", response.data);
  } catch (error: any) {
    console.error("Error calling Hello API:", error.message);
    process.exit(1);
  }
}
