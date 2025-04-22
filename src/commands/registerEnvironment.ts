import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { API_URL } from '../config';

export async function registerEnvironment(): Promise<void> {
  const filePath = path.resolve('devopx-env.json');
  if (!fs.existsSync(filePath)) {
    console.error('devopx-env.json not found in the repository root.');
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const envData = JSON.parse(rawData);

  for (const env_id of Object.keys(envData)) {
    const envConfig = envData[env_id];

    const {
      branch,
      manifest_path,
      is_dev,
      is_prod,
      trigger_on_update,
      required_validations,
      required_environments
    } = envConfig;

    const payload = {
      env_id,
      branch,
      manifest_path,
      is_dev,
      is_prod,
      trigger_on_update,
      required_validations,
      required_environments
    };

    try {
      const response = await axios.post(`${API_URL}/register-environment`, payload);
      console.log(`Environment '${env_id}' registered successfully!`);
      console.log('Response:', response.data);
    } catch (error: any) {
      console.error(`Error registering environment '${env_id}':`, error.message);
    }
  }
}
