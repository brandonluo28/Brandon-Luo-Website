import type { NextConfig } from 'next';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').at(-1) || '';
const githubPagesBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}`
  : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: githubPagesBasePath }
};
export default nextConfig;

