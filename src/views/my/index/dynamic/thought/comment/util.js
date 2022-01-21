const subjectLength = 30; // 话题的长度
const nameLength = 20; // 人名的长度

/**
 *  单个话题
 *  type: 是否存在话题
 *  first: 话题起始的位置
 *  second: 话题终止的位置
 *  data: 话题
 */
export const getSubject = (data) => {
  const first = data.indexOf("#");
  // 不存在起始符号
  if (first === -1) return {
    type: false,
  };
  const second = data.slice(first + 1).indexOf("#");
  if (second === -1 // 不存在终止符号
    || second > subjectLength // 字符长度
  ) {
    return {
      type: false,
    };
  } else {
    return {
      type: true,
      first,
      second: first + second + 2,
      data: data.slice(first + 1, first + second + 1),
    };
  }
};

/**
 *  多个话题
 *  type: 是否存在人名
 *  list: 人名出现的起始和终结集合
 *    first: 起始
 *    second: 终止
 *    name: 人名    
 */
export const getSubjectList = (val) => {
  const arr = []; // 话题数组
  let string = val; // 当前的字符串
  let code = 0; // 当前话题在原始字符串中的位置s
  // let reg = /[~!@#$%^&*/|,.，。！￥<>?";:_=[\]{}]/ // 人名中不允许出现符号，即提高人名判断的准确性
  
  const fn = (value) => {
    const first = value.indexOf("#") + 1; // 从 # 开始
    const second = value.slice(first).indexOf("#"); // 到下一个 # 为止
    if (first === 0) { // 不存在起始符号 - 结束
      string = "";
    } else if (second === -1) { // 不存在终止符号 - 结束
      string = "";
    } else if (second > subjectLength) { // 字符长度超过限定
      // 直接跳转到下一个 # 开始的地方 
      const next = value.slice(first).indexOf("#");
      if (next > -1) {
        code = code + first + next;
        string = value.slice(code);
      } else { // 若无 - 结束
        string = "";
      }
    } else {
      const name = {
        first: code + first - 1,
        second: code + first + second + 1,
        name: string.slice(first, first + second),
      };
      arr.push(name);
      code = code + first + second + 1;
      string = string.slice(first + second + 1);
    }
  };

  // 判断是否存在多个
  const isTransf = (value) => {
    fn(value);
    if (string.indexOf("#") > -1) {
      isTransf(string);
    }
  };

  if (string.indexOf("#") > -1) {
    isTransf(string);
    if (arr.length > 0) {
      return {
        type: true,
        list: arr,
      };
    } else {
      return {
        type: false,
      };
    }
  } else {
    return {
      type: false,
    };
  }
};

/**
 *  type: 是否存在人名
 *  list: 人名出现的起始和终结集合
 *    first: 起始
 *    second: 终止
 *    name: 人名    
 */
export const getName = (val) => {
  const arr = []; // 姓名数组
  let string = val; // 当前的字符串
  let code = 0; // 当前姓名在原始字符串中的位置s
  const reg = /[~!@#$%^&*/|,.，。！￥<>?";:_=[\]{}]/; // 人名中不允许出现符号，即提高人名判断的准确性
  
  const fn = (value) => {
    const first = value.indexOf("@") + 1; // 从@开始
    const second = value.slice(first).indexOf(" "); // 到下一个空格为止
    if (first === 0) { // 不存在起始符号 - 结束
      string = "";
    } else if (second === -1) { // 不存在终止符号 - 结束
      string = "";
    } else if (second > nameLength // 字符长度超过10个
      || reg.test(value.slice(first + 1, first + second)) // 不符合姓名正则
    ) {
      // 直接跳转到下一个@开始的地方 
      const next = value.slice(first).indexOf("@");
      if (next > -1) {
        code = code + first + next;
        string = value.slice(code);
      } else { // 若无 - 结束
        string = "";
      }
    } else {
      const name = {
        first: code + first - 1,
        second: code + first + second + 1,
        name: string.slice(first, first + second),
      };
      arr.push(name);
      code = code + first + second;
      string = string.slice(first + second);
    }
  };

  // 判断是否存在多个
  const isTransf = (value) => {
    fn(value);
    if (string.indexOf("@") > -1) {
      isTransf(string);
    }
  };

  if (string.indexOf("@") > -1) {
    isTransf(string);
    if (arr.length > 0) {
      return {
        type: true,
        list: arr,
      };
    } else {
      return {
        type: false,
      };
    }
  } else {
    return {
      type: false,
    };
  }
};

export const dealImage = (data, index) => {
  let list = [];
  list = data.slice(index).concat(data.slice(0, index));
  return list;
};

// 话题转换 - 只存在一个
export const transfSubject = (val) => {
  const obj = getSubject(val);
  if (obj.type) {
    return [
      {
        type: false,
        html: val.slice(0, obj.first),
      }, {
        type: true,
        html: `#${obj.data}#`,
      }, {
        type: false,
        html: val.slice(obj.second),
      },
    ];
  } else {
    return [{
      type: false,
      html: val,
    }];
  }
};

// 话题转换 - 可存在多个
export const transfSubjectList = (val) => {
  if (getSubjectList(val).type) {
    const list = [];
    let code = 0;
    for (const item of getSubjectList(val).list) {
      list.push({
        type: false,
        html: val.slice(code, item.first),
      });
      list.push({
        type: true,
        html: val.slice(item.first, item.second),
      });
      code = item.second;
    }
    list.push({
      type: false,
      html: val.slice(code),
    });
    return list;
  } else {
    return [
      {
        type: false,
        html: val,
      },
    ];
  } 
};

// 人名转换 - 可存在多个
export const transfPerson = (val) => {
  if (getName(val).type) {
    const list = [];
    let code = 0;
    for (const item of getName(val).list) {
      list.push({
        type: false,
        html: val.slice(code, item.first),
      });
      list.push({
        type: true,
        html: val.slice(item.first, item.second),
      });
      code = item.second;
    }
    list.push({
      type: false,
      html: val.slice(code),
    });
    return list;
  } else {
    return [
      {
        type: false,
        html: val,
      },
    ];
  }
};
