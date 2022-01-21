const checkContactUser = (label: any) => {
  return function (rule: any, value: any, callback: any) {
    if (!value.id) {
      callback(new Error(`${label}不能为空`));
    }
    callback();
  };
};
const checkContactUsers = (label: any) => {
  return function (rule: any, value: any, callback: any) {
    if (!value.length) {
      callback(new Error(`${label}不能为空`));
    }
    callback();
  };
};
const checkContact = (label: any) => {
  return function (rule: any, value: any, callback: any) {
    if (!value.orgs.length && !value.unions.length && !value.users.length) {
      callback(new Error(`${label}不能为空`));
    }
    callback();
  };
};

const checkJsonTable = (columns: any[], label: string) => {
  return function (rule: any, value: any, callback: any) {
    value.forEach((v: any, j: number) => {
      for (let i = 0; i < columns.length; i++) {
        const formItem: string = v[columns[i].prop];
        if (!formItem) {
          console.error('请检查 checkJsonTable 第一个参数是否与真实prop对应');
          break;
        }
        if (!formItem.trim()) {
          callback(new Error(`${label}：第${j + 1}行${columns[i].label}不能为空`));
        }
      }
    });
    callback();
  };
};

const checkPhone = (rule: any, value: any, callback: any) => {
  const reg1 = /^(0[0-9]{2,3}-)([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
  const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
  if (!value) {
    callback();
  } else {
    if (!reg.test(value) && !reg1.test(value)) {
      callback(new Error("号码格式不正确"));
    } else {
      callback();
    }
  }
};

const checkEmail = (rule: any, value: any, callback: any) => {
  if (value) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("电子邮箱格式不正确"));
    }
  } else {
    callback();
  }
};

export { checkContactUser, checkContactUsers, checkContact, checkJsonTable, checkPhone, checkEmail };
