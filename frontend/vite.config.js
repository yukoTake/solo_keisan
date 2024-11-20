import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/keisan": "http://localhost:6000",
    },
    // proxy: {
    //   "/keisan": {
    //     target: "http://localhost:6000",
    //     changeOrigin: true,
    //   },
    // },
  },
});
