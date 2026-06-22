import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// NOTE: Do NOT add @vitejs/plugin-react here — tanstackStart already
// includes React JSX transformation and must be listed before any JSX plugin.
export default defineConfig({
  base: "/CyberTrack/",
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { 
        entry: "server",
        preset: "github-pages" 
      },
    }),
  ],
});
