const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const usesStaticHtmlRoutes = process.env.NEXT_PUBLIC_STATIC_HTML_ROUTES === 'true';

export function sitePath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function sitePagePath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const deployPath = usesStaticHtmlRoutes && normalizedPath !== '/' && normalizedPath.endsWith('/')
    ? `${normalizedPath.slice(0, -1)}.html`
    : normalizedPath;
  return `${basePath}${deployPath}`;
}
