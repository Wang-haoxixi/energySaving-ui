// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  projects: [
    {
      root: './',
      // **optional** default: `[]`
      // Register globally Vue component glob.
      // If you set it, you can get completion by that components.
      // It is relative to root property.
      // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
      globalComponents: [
        // './src/components/**/*.vue',
        // './src/views/Components/**/*.vue',
        {
          // Component name
          name: 'IepEcharts',
          // Component file path, please use '/'.
          path: './src/components/IepCommon/ECharts.vue',
        },
        {
          name: 'IepOperationTableBtnGroup',
          path: './src/components/IepOperation/TableBtnGroup.vue',
        },
        {
          name: 'IepOperationCommonGroup',
          path: './src/components/IepOperation/CommonGroup.vue',
        },
        {
          name: 'IepJoditEditor',
          path: './src/components/IepJoditEditor/index.vue',
        },
        {
          name: 'IepJoditRead',
          path: './src/components/IepJoditEditor/read.vue',
        },
        {
          name: 'IepPagination',
          path: './src/components/IepCommon/Pagination.vue',
        },
        {
          name: 'IepNoData',
          path: './src/components/IepCommon/NoData.vue',
        },
      ],
    },
  ],
};
