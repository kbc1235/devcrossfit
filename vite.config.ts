import react from "@vitejs/plugin-react";

export default {
  base: "./",
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
};
