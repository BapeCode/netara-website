// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const isProd = process.env.NODE_ENV === 'production'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    service: passthroughImageService()
  },
  site: 'https://bapecode.github.io',
  base: isProd ? '/netara-website' : "/",
});