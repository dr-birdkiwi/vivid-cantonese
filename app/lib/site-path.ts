const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

export const siteBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName && !repositoryName.endsWith(".github.io")
    ? `/${repositoryName}`
    : "";

export function sitePath(path: string) {
  if (!path.startsWith("/") || !siteBasePath) return path;
  return `${siteBasePath}${path}`;
}
