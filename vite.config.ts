import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://192.168.3.243:31304",
        changeOrigin: true,
      },
      "/map": {
        target: "http://82.157.180.248:58787",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/map/, ""),
      },
      "/geojson": {
        target: "http://belt-and-road-1256849727.cos.ap-beijing.myqcloud.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geojson/, ""),
      },
    },
  },
});
