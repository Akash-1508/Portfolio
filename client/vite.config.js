import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Serves GET /api/config from public/api/config.json (dev server). Production: use same file at /api/config.json or reverse-proxy /api/config → file. */
function configApiPlugin() {
  return {
    name: "portfolio-config-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url === "/api/config") {
          try {
            const filePath = path.join(__dirname, "public/api/config.json");
            const body = readFileSync(filePath, "utf-8");
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(body);
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "config unavailable" }));
          }
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), configApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
