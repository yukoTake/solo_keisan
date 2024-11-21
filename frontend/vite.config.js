import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/keisan":
        process.env.NODE_ENV === "production"
          ? "https://solo-keisan.onrender.com"
          : "http://localhost:6000",
    },
    // proxy: {
    //   "/keisan": {
    //     target: "http://localhost:6000",
    //     changeOrigin: true,
    //   },
    // },
  },
});
