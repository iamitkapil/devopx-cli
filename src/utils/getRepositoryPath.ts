import { execSync } from "child_process";

export function getRepositoryPath(): string | null {
  try {
    const remoteUrl = execSync("git config --get remote.origin.url").toString().trim();
    const match = remoteUrl.match(/github\.com[/:](.+\/.+?)(\.git)?$/);
    
    if (match && match[1]) {
      return match[1];
    } else {
      console.error("Could not extract GitHub repo path from remote URL");
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching repository path:", error.message);
    return null;
  }
}