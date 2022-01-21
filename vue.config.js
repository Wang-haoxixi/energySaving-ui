const CompressionPlugin = require("compression-webpack-plugin");
const utils = require("./config/utils");
const devServer = require("./config/devServer");
const cacheGroups = require("./config/cacheGroups");
const isProduction = process.env.NODE_ENV === "production";

const commonCss = [
  "/cdn/animate/animate.css",
  "/cdn/iep/index.css",
  "//at.alicdn.com/t/font_1781189_de8k657zy5i.css" // temp
  // "/cdn/icon/font_1781189_c6sy2m9bgli.css"// new local
];
const commonJs = [
  "/cdn/jspdf/jspdf.min.js",
  // "/cdn/icon/font_1184303_vcs4zyngq5.js",
  "//at.alicdn.com/t/font_1781189_hfcpj4vavfk.js",
  "//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js",
  "//cdn.ronghub.com/RongIMLib-3.0.4-dev.min.js",
  "//cdn.ronghub.com/RongEmoji-2.2.7.min.js",
  "//cdn.ronghub.com/Libamr-2.2.5.min.js",
  "//cdn.ronghub.com/RongIMVoice-2.2.6.js"
];
// CDN外链，会插入到index.html中
const cdn = {
  css: [...commonCss],
  js: [...commonJs]
};

module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    // config.resolve.modules
    //   .add(path.resolve(__dirname, 'src'))
    config.plugin("html").tap(args => {
      args[0].title = "节能保";
      args[0].url = "www.woneng.net";
      args[0].cdn = cdn;
      return args;
    });
    config
      .plugin("webpack-context-replacement")
      .use(require("webpack").ContextReplacementPlugin, [
        /moment[/\\]locale$/,
        /zh-cn/
      ]);
    config
      .plugin("webpack-provide-plugin")
      .use(require("webpack").ProvidePlugin, [
        {
          introJs: "intro.js"
        }
      ]);
    config.plugin("define").tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        BUILD_PROJECT: JSON.stringify(utils.getProject()),
        BUILD_TEAM_NAME: JSON.stringify(utils.getProjectTeam()),
        BUILD_PRO_NAME: JSON.stringify(utils.getProjectName()),
        BUILD_VER_TAG: JSON.stringify(utils.getCurrentTag()),
        BUILD_GIT_HASH: JSON.stringify(utils.getGitHash()),
        BUILD_PRO_DESC: JSON.stringify(utils.getProjectDesc()),
        BUILD_NODE_VERSION: JSON.stringify(utils.getNodeVersion()),
        BUILD_YARN_VERSION: JSON.stringify(utils.getYarnVersion()),
        BUILD_TIME: Date.parse(new Date())
      });
      return definitions;
    });
    if (isProduction) {
      config.optimization.splitChunks({
        cacheGroups: cacheGroups.cacheGroups
      });
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 8192
        })
      );
    }
    return config;
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        // 引入全局变量样式,@使我们设置的别名,执行src目录
        prependData: `
          @import "@/styles/var.scss";
        `
      }
    }
  },
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    host: devServer.host, // can be overwritten by process.env.HOST
    open: false,
    port: devServer.port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: devServer.proxy,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pwa: {
    name: "节能保_全域节能，科技臻善！",
    themeColor: "#f74437",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
};
