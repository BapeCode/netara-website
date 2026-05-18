// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'

export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone'
    }),
    vite: {
        plugins: [tailwindcss()]
    },
    image: {
        service: passthroughImageService()
    },
    site: 'https://netara.fr',
})