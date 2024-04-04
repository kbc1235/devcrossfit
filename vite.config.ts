import react from "@vitejs/plugin-react";

export default {
  base: "./",
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "https://devcrossfit.netlify.app/",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
};
