import axios from "axios";

const API_URL = "http://34.207.164.161:3000";

export interface RegisterEnvironmentArgs {
  environment_name: string;
  environment_type: string;
  region: string;
  account: string;
  global: string;
}

export async function registerEnvironment(args: Partial<RegisterEnvironmentArgs>): Promise<void> {
  const { environment_name, environment_type, region, account, global } = args;

  if (!environment_name || !environment_type || !region || !account || !global) {
    console.error("Missing required arguments.");
    process.exit(1);
  }

  const payload = {
    environment_name,
    environment_type,
    region,
    account,
    global,
  };

  try {
    const response = await axios.post(`${API_URL}/register`, payload);
    console.log(`Environment '${environment_name}' registered successfully!`);
    console.log("Environment ID:", response.data?.data?.environment_id || "Not returned");
  } catch (error: any) {
    console.error("Error registering environment:", error.message);
    process.exit(1);
  }
}
