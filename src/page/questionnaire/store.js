export const getStore = (name) => {
  const obj = window.sessionStorage.getItem(name);
  const result = obj ? JSON.parse(obj) : {};
  return result.content;
};

export const setStore = (params) => {
  const { name, content } = params;
  const obj = {
    content: content,
    datetime: new Date().getTime(),
  };
  window.sessionStorage.setItem(name, JSON.stringify(obj));
};

export const removeStore = (name) => {
  window.sessionStorage.removeItem(name);
};

export const clearStore = () => {
  window.sessionStorage.clear();
};