import react from "@vitejs/plugin-react";

export default {
  base: "./",
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:18080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    "process.env": {
      VITE_API_BASE:
        process.env.NODE_ENV === "development"
          ? "http://localhost:18080"
          : "https://devcrossfit.netlify.app/",
    },
  },
};
