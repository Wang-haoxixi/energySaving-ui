
export default {
  data() {
    return {
      option: {
        menuAlign: 'left',
        editBtn: false,
        viewBtn: false,
        delBtn: false,
        align: 'left',
        addBtn: false,
        dialogClickModal: false,
        selection: false,
        refreshBtn: false,
        menu: false,
        column: [{
          label: '诊断字段名称',
          prop: 'dataFieldName',
        },
        {
          label: '是否异常',
          prop: 'state',
          slot: true,
        },
        {
          label: '诊断实体数据数量',
          prop: 'total',
        },
        {
          label: '脏数据数量',
          prop: 'errorTotal',
        },
        {
          label: '诊断时间(开始/结束)',
          prop: 'time',
          slot: true,
        },
        {
          label: '耗时',
          prop: 'outtime',
          slot: true,
        }],
      },
    };
  },
};