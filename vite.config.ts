import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
// https://vitejs.dev/config/

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['vite.svg'],
  manifest: {
    name: "Chataap",
    short_name: "cp",
    description: "a normal chat application",
    icons: [
      {
        src: "/public/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/public/maskable_icon.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/public/maskable_icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#000000",
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait'
  }
}

export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
})
