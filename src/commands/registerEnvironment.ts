import axios from "axios";
import { API_URL } from '../config';



export interface RegisterEnvironmentArgs {
  env_id: string;
  branch: string;
  is_dev: boolean;
  is_prod: boolean;
  trigger_on_update: boolean;
  required_environment: string[][];
  required_validations: string[];
}

export async function registerEnvironment(args: Partial<RegisterEnvironmentArgs>): Promise<void> {
  const {
    env_id,
    branch,
    is_dev,
    is_prod,
    trigger_on_update,
    required_environment,
    required_validations
  } = args;

  if (
    !env_id ||
    !branch ||
    typeof is_dev !== "boolean" ||
    typeof is_prod !== "boolean" ||
    typeof trigger_on_update !== "boolean" ||
    !Array.isArray(required_environment) ||
    !Array.isArray(required_validations)
  ) {
    console.error("Missing or invalid required arguments.");
    process.exit(1);
  }

  const payload = {
    env_id,
    branch,
    is_dev,
    is_prod,
    trigger_on_update,
    required_environment,
    required_validations
  };

  try {
    const response = await axios.post(`${API_URL}/register`, payload);
    console.log(`Environment '${env_id}' registered successfully!`);
    console.log("Response:", response.data);
  } catch (error: any) {
    console.error("Error registering environment:", error.message);
    process.exit(1);
  }
}