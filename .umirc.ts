import { defineConfig } from "umi";
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
import NodeModulesPolyfillPlugin from "@esbuild-plugins/node-modules-polyfill";
import { Buffer } from "buffer";
import process from "process";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/upload", component: "upload" },
    { path: "/services", component: "services" },
    { path: "/models", component: "services" },
    { path: "/models/:id", component: "model" },
    { path: "/profile", component: "profile", wrappers: ["@/wrappers/auth"] },
    { path: "/roadmap", component: "roadMap" },
    { path: "/whitePaper", component: "whitePaper" },
    { path: "/privacy", component: "privacy" },
  ],
  npmClient: "pnpm",
  plugins: ["@umijs/plugins/dist/model", "@umijs/plugins/dist/request"],
  model: {},
  request: {},
  esbuildMinifyIIFE: true,
  chainWebpack(config, { env, webpack }) {
    // config.resolve.alias
    //   .set("node:buffer", "buffer")
    //   .set("node:process", "process/browser");
    // config.plugin("provide").use(webpack.ProvidePlugin, [
    //   {
    //     Buffer: ["buffer", "Buffer"],
    //     process: "process/browser",
    //   },
    // ]);
    config.plugin("provide2").use(webpack.NormalModuleReplacementPlugin, [
      /node/, // 匹配 `node:buffer` 前缀模块
      (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      }, // 替换为 `buffer` 包
    ]);

    // 添加额外插件
    // memo.plugin('NodePolyfillPlugin').use(NodePolyfillPlugin, []);
    // memo.resolve.alias.set('node:buffer', 'buffer');
    // memo.resolve.fallback
    //   .set('buffer', require.resolve('buffer/'))
    //   .set('stream', require.resolve('stream-browserify'));
    // memo.experiments({
    //   asyncWebAssembly: true,
    // })

    //
  },
  jsMinifier: "none",
  favicons: ["/favicon.ico"],
  title: "Bitmodel",
});
