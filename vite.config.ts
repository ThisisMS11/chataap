import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ["vite.svg"],
  manifest: {
    name: "chatapp",
    short_name: "chatapp",
    description: "An app that can helps you chat with others",
    icons: [
      {
        src: "/chat180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait'
  }
}

export default defineConfig({
  base: "./",
  plugins: [svgr(), react(), VitePWA(manifestForPlugin)],

})
