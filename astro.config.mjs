// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node'

const isProd = process.env.NODE_ENV === 'production'

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    service: passthroughImageService()
  },
  site: 'https://bapecode.github.io',
  base: isProd ? '/netara-website' : "/",
});