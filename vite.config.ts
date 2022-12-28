import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

import path from "path";
import vue from "@vitejs/plugin-vue";

import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import generateSitemap from "vite-plugin-pages-sitemap";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import banner from "vite-plugin-banner";
import Components from "unplugin-vue-components/vite";

import { VitePWA } from "vite-plugin-pwa";

const defaultConfig = {
  clearScreen: true,
  mode: "jit",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./frontend", import.meta.url)),
      '~/': `${path.resolve(__dirname, 'frontend')}/`,
    },
  },
  plugins: [
    vue(),
    banner(
      "/*! Website by PremoWeb. Learn more at https://premoweb.com/solutions/web-development/. */\n  "
    ),
    pluginRewriteAll(),
    Layouts({
      layoutsDirs: 'layouts'
    }),

    Pages(
      {
        pagesDir: [{ dir: "pages", baseRoute: "" }],
        extensions: ["vue"],
        syncIndex: true,
        onRoutesGenerated(routes) {
          generateSitemap({
            routes: [...routes],
            dest: "frontend/public/",
            filename: "sitemap.xml",
            hostname: "https://example.com/",
            changefreq: "daily",
            readable: true,
            allowRobots: true,
          });
        },
      }
    ),

    Components({
      // relative paths to the directory to search for components.
      dirs: ["components"],

      extensions: ["vue"], // valid file extensions for components.
      deep: true, // search for subdirectories
      resolvers: [], // resolvers for custom components

      // generate `components.d.ts` global declarations,
      // also accepts a path for custom filename
      // default: `true` if package typescript is installed
      dts: false,

      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],

      // auto import for directives
      // default: `true` for Vue 3, `false` for Vue 2
      // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
      // To install Babel, run: `npm install -D @babel/parser`
      directives: true,

      importPathTransform: (v) => v, // Transform path before resolving

      allowOverrides: false, // Allow for components to override other components with the same name

      // filters for transforming targets

      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      base: "/dist/",
      useCredentials: true, // Require to resolve 401 error
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
    }),
  ],
  base: "/",
  root: "frontend/",
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 80,
    proxy: {
      "^/api/": {
        target: "http://localhost:81",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      ...defaultConfig,
    };
  } else {
    return {
      ...defaultConfig,
      base: "/dist/",
    };
  }
});