import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getBasePath() {
  if (!process.env.GITHUB_ACTIONS || !process.env.GITHUB_REPOSITORY) return '/';

  const repository = process.env.GITHUB_REPOSITORY.split('/')[1];
  // User and organization sites are served from the domain root.
  if (repository.toLowerCase().endsWith('.github.io')) return '/';

  return `/${repository}/`;
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
});
