import fetch from 'node-fetch';

const API_URL = process.env.API_URL || '';

export async function promoteArtifacts(args: any) {
  const fromEnv = args['from-env'];
  const toEnv = args['to-env'];

  if (!fromEnv || !toEnv) {
    console.error('Error: Both --from-env and --to-env are required');
    process.exit(1);
  }

  try {
    console.log(`Requesting promote from ${fromEnv} to ${toEnv}...`);

    const res = await fetch(`${API_URL}/promoteArtifacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_env: fromEnv,
        to_env: toEnv
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API error: ${res.status} ${errorText}`);
    }

    console.log(`Successfully promoted artifacts from ${fromEnv} to ${toEnv}.`);
  } catch (error: any) {
    console.error(`Error promoting artifacts: ${error.message}`);
    process.exit(1);
  }
}
