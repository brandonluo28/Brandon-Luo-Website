import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

function normalizeBasePath(value: string) {
  const path = value.trim().replace(/^\/+|\/+$/g, '');
  return path ? `/${path}` : '';
}

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').at(-1) || '';
const inferredGitHubPagesBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !repositoryName.toLowerCase().endsWith('.github.io')
  ? `/${repositoryName}/`
  : '/';
const configuredPagesBasePath = process.env.PAGES_BASE_PATH === undefined
  ? undefined
  : normalizeBasePath(process.env.PAGES_BASE_PATH);
const githubPagesBasePath = process.env.PAGES_BASE_PATH !== undefined
  ? `${configuredPagesBasePath || ''}/`
  : inferredGitHubPagesBasePath;

export default defineConfig({base:githubPagesBasePath,css:{postcss:{plugins:[tailwindcss()]}},plugins:[vinext()]});

