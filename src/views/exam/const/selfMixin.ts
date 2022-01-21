export default {
  methods: {
    saveFlatten(cn: any, arr: any) {
      arr.forEach((ele: any) => {
        if (ele.children?.length) {
          this.saveFlatten(cn, ele.children);
          cn.push(ele);
        } else {
          cn.push(ele);
        }
      });
      return cn;
    },
    dealCn(cn: any, selectArray: any) {
      let selectCn: any = [];
      cn.map((m: any) => {
        if (selectArray.includes(m.id)) {
          selectCn.push(m.label);
        }
      });
      selectCn = selectCn.reverse().join("/");
      return selectCn;
    },
  },
};
