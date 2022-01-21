exports.cacheGroups = {
  html2canvas: {
    name: 'html2canvas',
    test: /[\\/]node_modules[\\/]html2canvas[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  jodit: {
    name: 'jodit',
    test: /[\\/]node_modules[\\/]jodit[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  echarts: {
    name: 'echarts',
    test: /[\\/]node_modules[\\/]echarts[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  d3: {
    name: 'd3',
    test: /[\\/]node_modules[\\/]d3[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  vue: {
    name: 'vue',
    test: /[\\/]node_modules[\\/]vue[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  zrender: {
    name: 'zrender',
    test: /[\\/]node_modules[\\/]zrender[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  lodash: {
    name: 'lodash',
    test: /[\\/]node_modules[\\/]lodash[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  coreJs: {
    name: 'coreJs',
    test: /[\\/]node_modules[\\/]core-js[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  moment: {
    name: 'moment',
    test: /[\\/]node_modules[\\/]moment[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  elliptic: {
    name: 'elliptic',
    test: /[\\/]node_modules[\\/]elliptic[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  cryptoJs: {
    name: 'cryptoJs',
    test: /[\\/]node_modules[\\/]crypto-js[\\/]/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  element: {
    name: 'element',
    test: /[\\/]node_modules[\\/]element-ui[\\/].*/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  vueCropper: {
    name: 'vueCropper',
    test: /[\\/]node_modules[\\/]vue-cropper[\\/].*/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  browserifySign: {
    name: 'browserifySign',
    test: /[\\/]node_modules[\\/]browserify-sign[\\/].*/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  vueDraggable: {
    name: 'vueDraggable',
    test: /[\\/]node_modules[\\/]vuedraggable[\\/].*/,
    chunks: 'all',
    priority: 1,
    reuseExistingChunk: true,
    enforce: true
  },
  util: {
    name: 'util',
    test: /[\\/]src[\\/]util[\\/]/,
    chunks: 'all',
    priority: -1,
    reuseExistingChunk: true,
    enforce: true
  },
  store: {
    name: 'store',
    test: /[\\/]src[\\/]store[\\/]/,
    chunks: 'all',
    priority: -1,
    reuseExistingChunk: true,
    enforce: true
  },
  api: {
    name: 'api',
    test: /[\\/]src[\\/]api[\\/]/,
    chunks: 'all',
    priority: -1,
    reuseExistingChunk: true,
    enforce: true
  },
  mixins: {
    name: 'mixins',
    test: /[\\/]src[\\/]mixins[\\/]/,
    chunks: 'all',
    priority: -1,
    reuseExistingChunk: true,
    enforce: true
  },
  components: {
    name: 'components',
    test: /[\\/]src[\\/]components[\\/]/,
    chunks: 'all',
    priority: -2,
    reuseExistingChunk: true,
    enforce: true
  },
  viewComponents: {
    name: 'viewComponents',
    test: /[\\/]src[\\/]views[\\/]Components[\\/]/,
    chunks: 'all',
    priority: -2,
    reuseExistingChunk: true,
    enforce: true
  },
  layouts: {
    name: 'layouts',
    test: /[\\/]src[\\/]layouts[\\/]/,
    chunks: 'all',
    priority: -3,
    reuseExistingChunk: true,
    enforce: true
  },
  page: {
    name: 'page',
    test: /[\\/]src[\\/]page[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  admin: {
    name: 'admin',
    test: /[\\/]src[\\/]views[\\/]admin[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  btms: {
    name: 'btms',
    test: /[\\/]src[\\/]views[\\/]btms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  channel: {
    name: 'channel',
    test: /[\\/]src[\\/]views[\\/]channel[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  Components: {
    name: 'Components',
    test: /[\\/]src[\\/]views[\\/]Components[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  conm: {
    name: 'conm',
    test: /[\\/]src[\\/]views[\\/]conm[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  cpms: {
    name: 'cpms',
    test: /[\\/]src[\\/]views[\\/]cpms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  crms: {
    name: 'crms',
    test: /[\\/]src[\\/]views[\\/]crms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  dev_ops: {
    name: 'dev_ops',
    test: /[\\/]src[\\/]views[\\/]dev_ops[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  dms: {
    name: 'dms',
    test: /[\\/]src[\\/]views[\\/]dms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  exam: {
    name: 'exam',
    test: /[\\/]src[\\/]views[\\/]exam[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  fms: {
    name: 'fms',
    test: /[\\/]src[\\/]views[\\/]fms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  gpms: {
    name: 'gpms',
    test: /[\\/]src[\\/]views[\\/]gpms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  ics: {
    name: 'ics',
    test: /[\\/]src[\\/]views[\\/]ics[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  meetting: {
    name: 'meetting',
    test: /[\\/]src[\\/]views[\\/]meetting[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  mlms: {
    name: 'mlms',
    test: /[\\/]src[\\/]views[\\/]mlms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  my: {
    name: 'my',
    test: /[\\/]src[\\/]views[\\/]my[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  ods: {
    name: 'ods',
    test: /[\\/]src[\\/]views[\\/]ods[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  operate: {
    name: 'operate',
    test: /[\\/]src[\\/]views[\\/]operate[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  qms: {
    name: 'qms',
    test: /[\\/]src[\\/]views[\\/]qms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  recruit: {
    name: 'recruit',
    test: /[\\/]src[\\/]views[\\/]recruit[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  so: {
    name: 'so',
    test: /[\\/]src[\\/]views[\\/]so[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  task: {
    name: 'task',
    test: /[\\/]src[\\/]views[\\/]task[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  tms: {
    name: 'tms',
    test: /[\\/]src[\\/]views[\\/]tms[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  wel: {
    name: 'wel',
    test: /[\\/]src[\\/]views[\\/]wel[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
  yyexam: {
    name: 'yyexam',
    test: /[\\/]src[\\/]views[\\/]yyexam[\\/]/,
    chunks: 'all',
    priority: -4,
    reuseExistingChunk: true,
    enforce: true
  },
}
