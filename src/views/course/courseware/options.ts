import initial from "lodash/initial";

const initSearchForm = () => {
  return {
    type: '',
    sort: "",
  };
};

const formToVo = (form: any) => {
  const newForm = { ...form };
  const kind: string = newForm.kind;
  const kindArr = kind.split(',').map(m => +m);
  newForm.kind = initial(kindArr);
  return newForm;
};

const formToDto = (form: any) => {
  const newForm = { ...form };
  newForm.kind = newForm.kind.join(',') + ',';
  return newForm;
};

class CourseWare {
  id = 0;
  kind = "";
  wareName = "";
  wareSize = "";
  /**
   * 上传课件路径
   */
  wareUrl = "";
  /**
   * 课件类型 1 视频 .mp4, 2 音频 .mp3, 3 文档 .pdf 4 其他 *
   */
  type = "4";
}


const courseWareRules = {
  wareName: [
    {
      type: "string",
      required: true,
      message: "请填写课件名",
      trigger: "blur",
    },
    {
      type: "string",
      max: 100,
      message: "课件名长度限制100字",
      trigger: "change",
    },
  ],
  kind: [
    {
      type: "array",
      required: true,
      message: "请填写课件类型",
      trigger: "blur",
    },
  ],
  wareUrl: [
    {
      type: "string",
      required: true,
      message: "请上传课件",
      trigger: "blur",
    },
  ],
};

export { initSearchForm, formToDto, formToVo, CourseWare, courseWareRules };
