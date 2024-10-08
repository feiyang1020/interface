import { defineConfig } from "umi";
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/services", component: "services" },
    { path: "/models", component: "services" },
    { path: "/models/:id", component: "model" },
    { path: "/profile", component: "profile" },
    { path: "/roadmap", component: "roadMap" },
    { path: "/whitePaper", component: "whitePaper" },
    { path: "/privacy", component: "privacy" },
  ],
  npmClient: "pnpm",
  plugins: ["@umijs/plugins/dist/model", "@umijs/plugins/dist/request"],
  model: {},
  request: {},
  esbuildMinifyIIFE: true,
  // chainWebpack(memo, { env, webpack }) {
    

  //   // 添加额外插件
  //   memo.plugin('NodePolyfillPlugin').use(NodePolyfillPlugin, []);
  //   memo.experiments({
  //     asyncWebAssembly: true,
  //   })

    
  // },
  favicons: ["/favicon.ico"],
  title: "BitModel",
  
});
