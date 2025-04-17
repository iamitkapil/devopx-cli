export function getRepositoryPath(type: string): string {
    switch (type.toLowerCase()) {
      case "npm":
        return "https://artifactory.example.com/npm/";
      case "maven":
        return "https://artifactory.example.com/maven/";
      case "docker":
        return "https://artifactory.example.com/docker/";
      default:
        return "https://artifactory.example.com/generic/";
    }
  }
  