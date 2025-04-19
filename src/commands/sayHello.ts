import axios from "axios";
import { API_URL } from '../config';



export async function sayHello(): Promise<void> {
  try {
    const response = await axios.get(`${API_URL}/Hello`);
    console.log("Server Response:", response.data);
  } catch (error: any) {
    console.error("Error calling Hello API:", error.message);
    process.exit(1);
  }
}
