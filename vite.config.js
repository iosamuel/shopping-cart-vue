import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSFCinJS from "vite-plugin-vue-sfc-in-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSFCinJS()],
});
