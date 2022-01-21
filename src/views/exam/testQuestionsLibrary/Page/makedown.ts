export const gruber = {
  block: {
    //自定义每题的题干、选项、答案和解析
    //类型
    qtType: function qtType(block: any) {
      const m = block.match(/^(类型[:：])\s*(.*?)\s*(?:\n|$)/);
      if (!m) return undefined;
      const res = /([、，,．]|\.)/g;
      m[2] = m[2].replace(res, ',');
      const labels = ['type'];
      const arrObj = [{
        key: 'RADIO',
        name: '单选',
      }, {
        key: 'CHECKBOX',
        name: '复选',
      }, {
        key: 'CHECKBOX',
        name: '多选',
      }, {
        key: 'CHECKED',
        name: '判断',
      }, {
        key: 'GAPFILLING',
        name: '填空',
      }, {
        key: 'ESSAYQUESTION',
        name: '问答',
      }];
      let data = '';
      arrObj.forEach(element => {
        if (m[2] && m[2].indexOf(element.name) !== -1) {
          data = element.key;
        }
      });
      labels.push(data);
      return labels;
    },
    qtTitle: function qtTitle(block: any) {
      const m = block.match(/^(([0-9]+\.)|(((\()|（)[0-9]+((\))|）)))\s*(.*?)\s*(?:\n|$)/);
      if (!m) return undefined;
      const title = ['title'].concat(m[8]);
      return title;
    },
    //选项
    qtKey: function qtKey(block: any, qt_type: any = 'RADIO') {
      const m = block.match(/^([A-Z])(\.)\s*(.*?)\s*(?:\n|$)/);
      if (!m) return undefined;
      if (qt_type === "RADIO" || qt_type === "CHECKBOX") {
        const n = m[1].match(/^[A-Z]/);
        const key = [n[0]].concat(m[3]);
        return key;
      } else if (qt_type === "CHECKED") {
        return [{ "key": "A", "value": "正确" }, { "key": "B", "value": "错误" }];
      } else {
        const error = ['key_error'];
        error.push(m[0]);
        return error;
      }
    },
    //答案
    qtAnswer: function qtAnswer(block: any, qt_type: any) {
      const m = block.match(/^(答案[:：])\s*(.*?)\s*(?:\n|$)/);
      if (!m) return undefined;
      const answer = ['answer'];
      let n;
      if (qt_type === "RADIO") {
        n = m[2].match(/^\s*[a-z]\s*(?:\n|$)/i);
        if (n == null) {
          const error = ['ans_error'];
          error.push(m[2]);
          return error;
        } else {
          answer.push(m[2].toUpperCase());
        }
      } else if (qt_type === "CHECKBOX") {
        n = m[2].match(/^\s*[a-z]{1,26}\s*(?:\n|$)/i);
        if (n == null) {
          const error = ['ans_error'];
          error.push(m[2]);
          return error;
        } else {
          answer.push(m[2].toUpperCase().split(''));
        }
      } else if (qt_type === "CHECKED") {
        n = m[2].match(/^\s*(正确|错误|对|错)\s*(?:\n|$)/i);
        if (n == null) {
          const error = ['ans_error'];
          error.push(m[2]);
          return error;
        } else {
          const txt = m[2] == '对' ? '正确' : m[2] == '错' ? '错误' : m[2];
          answer.push(txt);
        }
      } else {
        answer.push(m[2]);
      }
      return answer;
    },
    // 解析
    qtAnalysis: function qtAnalysis(block: any) {
      const m = block.match(/^(解析[:：])\s*(.*?)\s*(?:\n|$)/);
      if (!m) return undefined;
      const quesExplain = ['quesExplain'];
      quesExplain.push(m[2]);
      return quesExplain;
    },
    // 标签
    qtTag: function qtTag(block: any) {
      const m = block.match(/^(标签[:：])\s*(.*?)\s*(?:\n|$)/);
      if (!m) return undefined;
      const res = /([、，,．]|\.)/g;
      m[2] = m[2].replace(res, ',');
      const labels = ['tag'];
      labels.push(m[2]);
      return labels;
    },
    // 难度
    qtLevel: function qtLevel(block: any) {
      const m = block.match(/^(难度[:：])\s*(.*?)\s*(?:\n|$)/);
      if (!m) return undefined;
      const res = /([、，,．]|\.)/g;
      m[2] = m[2].replace(res, ',');
      const labels = ['level'];
      labels.push(m[2]);
      return labels;
    },
    para: function para(block: any) {
      return ['para'].concat(block);
    },
  },
};

export const markArray = [
  'qtType', 'qtTitle', 'qtKey', 'qtAnswer', 'qtAnalysis', 'qtTag', 'qtLevel', 'para',
];