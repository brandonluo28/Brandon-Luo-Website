import type { NextConfig } from 'next';

function normalizeBasePath(value: string) {
  const path = value.trim().replace(/^\/+|\/+$/g, '');
  return path ? `/${path}` : '';
}

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').at(-1) || '';
const inferredGitHubPagesBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !repositoryName.toLowerCase().endsWith('.github.io')
  ? `/${repositoryName}`
  : '';
const githubPagesBasePath = process.env.PAGES_BASE_PATH !== undefined
  ? normalizeBasePath(process.env.PAGES_BASE_PATH)
  : inferredGitHubPagesBasePath;
const usesStaticHtmlRoutes = process.env.PAGES_BASE_PATH !== undefined || process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
    NEXT_PUBLIC_STATIC_HTML_ROUTES: usesStaticHtmlRoutes ? 'true' : 'false'
  }
};
export default nextConfig;

