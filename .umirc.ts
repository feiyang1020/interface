import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: "pnpm",
  chainWebpack(config, { env, webpack }) {
    config.set("experiments", {
      ...config.get("experiments"),
      asyncWebAssembly: true,
    });
    config.plugin("NodePolyfillPlugin").use(webpack.ProvidePlugin, [
      {
        process: "process/browser.js",
      },
    ]);
    // const REG = /\.wasm$/;

    // config.module.rule("asset").exclude.add(REG).end();

    // config.module
    //   .rule("wasm")
    //   .test(REG)
    //   .include.add(/node_modules/)
    //   .end()
    //   .type("webassembly/async")
    //   .end();
  },
  mfsu: {
    chainWebpack(config) {
      config.set("experiments", {
        ...config.get("experiments"),
        syncWebAssembly: true,
      });
      const REG = /\.wasm$/;
      config.module.rule("asset").exclude.add(REG).end();
      config.module
      .rule("wasm")
      .test(REG)
      .exclude.add(/node_modules/)
      .end()
      .type("webassembly/async")
      .end();
    },
  },
});
