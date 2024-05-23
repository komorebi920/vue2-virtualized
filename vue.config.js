const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      css: {
        modules: {
          localIdentName: "[name]-[local]_[hash:8]",
        },
      },
    },
  },
  transpileDependencies: true,
});
