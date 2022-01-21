const initForm = (dictId = 0, parentId = 0, label = '新建分类') => {
  return {
    dictId,
    parentId,
    label,
  };
};
const updateForm = (id: number, dictId = 0, parentId = 0, label = '新建分类') => {
  return {
    id,
    dictId,
    parentId,
    label,
  };
};

export { initForm, updateForm };
