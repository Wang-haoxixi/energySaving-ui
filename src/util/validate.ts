/**
 * 判断是否为空
 */
export const validatenull = (val: any) => {
  if (typeof val === "boolean") {
    return false;
  }
  if (typeof val === "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (
      val == "null" ||
      val == null ||
      val == "undefined" ||
      val == undefined ||
      val == ""
    )
      return true;
    return false;
  }
  return false;
};

/**
 * 邮箱
 * @param {*} s
 */
export const isEmail = (s: string) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
};

/**
 * 手机号码
 * @param {*} s
 */
export const isMobile = (s: string) => {
  return /^1[0-9]{10}$/.test(s);
};

/**
 * 电话号码
 * @param {*} s
 */
export const isPhone = (s: string) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

/**
 * URL地址
 * @param {*} s
 */
export const isURL = (s: string) => {
  return /^http[s]?:\/\/.*/.test(s);
};

/* 合法uri */
export const validateURL = (textval: string) => {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
};

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export const validateEmail = (email: string) => {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * 判断手机号码是否正确
 */
export const isvalidatemobile = (phone: string) => {
  const list = [];
  let result = true;
  let msg = "";
  const isPhone = /^[1]([3-9])[0-9]{9}$/;
  if (!validatenull(phone)) {
    if (phone.length == 11) {
      if (!isPhone.test(phone)) {
        msg = "手机号码格式不正确";
      } else {
        result = false;
      }
    } else {
      msg = "手机号码长度有误";
    }
  } else {
    msg = "手机号码不能为空";
  }
  list.push(result);
  list.push(msg);
  return list;
};


/**
 * 空格验证
 */
export const isvalidateSpace = (data: string) => {
  return /^[\s]*$/.test(data);
};