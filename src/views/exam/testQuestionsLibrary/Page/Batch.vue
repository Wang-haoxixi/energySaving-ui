<template>
  <div>
    <div class="batch-import">
      <el-container>
        <div class="input-area">
          <div class="input-title">
            <el-button class="iep-btn-l">输入区</el-button>
            <a
              class="download"
              href="https://woneng-oss.oss-cn-hangzhou.aliyuncs.com/20201113/e98c0706059045ad9d6ae17f4753eb73.docx"
              download="下载模板"
            >下载模板</a>
            <div>
              <el-button type="text" icon="el-icon-warning" size="medium" @click="handleVisible">格式</el-button>
              <el-button
                style="margin-left:15px;"
                class="iep-btn-l"
                type="primary"
                @click="submit"
                :disabled="sumbitDis"
              >保存</el-button>
            </div>
          </div>

          <div class="input-content">
            <!-- <el-input type="textarea" :autosize="{minRows:23,maxRows:23}" placeholder='请将当前所选题型的所有试题复制到这里'
              v-model="testQuestions">
              <el-scrollbar>
                <slot></slot>
              </el-scrollbar>
            </el-input>-->

            <iep-input-area
              :autosize="{minRows:24,maxRows:24}"
              :maxlength="99999999999999"
              placeholder="请将所有试题复制到这里"
              :value="testQuestions"
              @input="editor(arguments[0])"
            ></iep-input-area>
          </div>
        </div>

        <el-aside class="inspection-area" width="50%">
          <div class="inspection-title">
            <el-button class="iep-btn-l">检查区</el-button>
            <span class="error-text" v-show="errorCount>0">共{{errorCount}}处错误，请参照例题修改</span>
          </div>
          <el-scrollbar>
            <div id="inspectionContent">
              <div class="question" v-for="(item,index) in itemBankList" :key="index">
                <template v-if="item.title && item.title.length > 4 && item.title.length < 2000">
                  <p>
                    <span class="caption">{{index+1}}.</span>
                    {{item.title}}
                  </p>
                </template>
                <template v-else>
                  <p class="qt_error">题目：至少5个字符最多2000个字符</p>
                </template>
                <p
                  class="qt_error"
                  v-if="item.options.length < 2 && (item.type==='RADIO' || item.type==='CHECKBOX')"
                >选项（至少两项）</p>
                <ul v-if="item.type==='RADIO'">
                  <li v-for="(option,index) in item.options" :key="index" :class="option.class">
                    <el-radio v-model="item.answer" :label="option.key">
                      <span class="caption">{{option.key}}.</span>
                      {{option.value}}
                    </el-radio>
                  </li>
                </ul>
                <el-checkbox-group v-model="item.answer" v-if="item.type==='CHECKBOX'">
                  <el-checkbox
                    v-for="(option,index) in item.options"
                    :label="option.key"
                    :key="index"
                    :class="option.class"
                  >
                    <span class="caption">{{option.key}}.</span>
                    {{option.value}}
                  </el-checkbox>
                </el-checkbox-group>
                <p v-if="item.answer">
                  <span class="caption">答案：</span>
                  {{item.answer}}
                </p>
                <p class="qt_error" v-if="!item.answer">答案: 缺少答案</p>
                <p v-if="item.quesExplain">
                  <span class="caption">解析：</span>
                  {{item.quesExplain}}
                </p>
                <p v-if="item.type">
                  <span class="caption">类型：</span>
                  {{getType(item.type)}}
                </p>
                <p class="qt_error" v-else>类型: 缺少类型</p>
                <!-- <p class='qt_error' v-else>解析: 缺少解析</p> -->
                <p v-if="item.tag">
                  <span class="caption">标签：</span>
                  {{item.tag}}
                </p>
                <p class="qt_error" v-else>标签: 缺少标签</p>
                <p v-if="item.level">
                  <span class="caption">难度：</span>
                  {{item.level}}
                </p>
                <p class="qt_error" v-else>难度: 缺少难度</p>
              </div>
            </div>
          </el-scrollbar>
        </el-aside>
      </el-container>
    </div>
    <el-dialog :visible.sync="dialogShow" width="500px" title="例题示范" @close="dialogShow=false">
      <div class="dialog-body">
        <div class="accordion batch-cont">
          <div class="accordion-group">
            <h2>单选题</h2>
            <div id="collapse1" class="b-example accordion-body collapse in">
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、和(1)三种格式。
                  <br />2、选项支持A.和A、两种格式，最多支持 8 个选项。
                  <br />3、答案中请勿加分隔符或空格
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.驾驶人有下列哪种违法行为一次记6分</span>
                  <br />
                  <span>A、使用其他车辆行驶证</span>
                  <br />
                  <span>B、饮酒后驾驶机动车</span>
                  <br />
                  <span>C、车速超过规定时速50%以上</span>
                  <br />
                  <span>D、违法占用应急车道行驶</span>
                  <br />
                  <span>答案:D</span>
                  <br />
                  <span>
                    解析:请仔细阅读交规
                    <span class="exam-notes">(若无解析本行可不填)</span>
                  </span>
                  <br />
                  <span>
                    标签:
                    <span>内网水巢</span>、
                    <span>数据基因</span>、
                    <span>个人赋能</span>
                  </span>
                  <br />
                  <span>
                    类型:
                    <span>单选</span>
                  </span>
                  <br />
                  <span>
                    难度:
                    <span>简单</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion batch-cont batch-cont-dn">
          <div class="accordion-group">
            <h2>多选题</h2>
            <div id="collapse2" class="b-example accordion-body collapse in">
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、和(1)三种格式。
                  <br />2、选项支持A.和A、两种格式，最多支持 8 个选项。
                  <br />3、答案中请勿加分隔符或空格
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.驾驶人有下列哪种违法行为一次记6分？</span>
                  <br />
                  <span>A、使用其他车辆行驶证</span>
                  <br />
                  <span>B、饮酒后驾驶机动车</span>
                  <br />
                  <span>C、车速超过规定时速50%以上</span>
                  <br />
                  <span>D、违法占用应急车道行驶</span>
                  <br />
                  <span>答案:ABCD</span>
                  <br />
                  <span>
                    解析:请仔细阅读交规
                    <span class="exam-notes">(若无解析本行可不填)</span>
                  </span>
                  <br />
                  <span>
                    标签:
                    <span>内网水巢</span>、
                    <span>数据基因</span>、
                    <span>个人赋能</span>
                  </span>
                  <br />
                  <span>
                    类型:
                    <span>复选</span>
                  </span>
                  <br />
                  <span>
                    难度:
                    <span>简单</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion batch-cont batch-cont-dn">
          <div class="accordion-group">
            <h2>判断题</h2>
            <div id="collapse3" class="b-example accordion-body collapse in">
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、(1）三种格式。
                  <br />2、答案支持正确、错误和对、错两种格式。
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.国际象棋起源于英国吗？</span>
                  <br />
                  <span>答案:正确</span>
                  <br />
                  <span>
                    解析:请仔细阅读交规
                    <span class="exam-notes">(若无解析本行可不填)</span>
                  </span>
                  <br />
                  <span>
                    标签:
                    <span>内网水巢</span>、
                    <span>数据基因</span>、
                    <span>个人赋能</span>
                  </span>
                  <br />
                  <span>
                    类型:
                    <span>判断</span>
                  </span>
                  <br />
                  <span>
                    难度:
                    <span>简单</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion batch-cont batch-cont-dn">
          <div class="accordion-group">
            <h2>填空题</h2>
            <div id="collapse4" class="b-example accordion-body collapse in">
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、和(1)三种格式。
                  <br />2、填空项仅支持括号（ ）形式来表示。
                  <br />3、题目有多个填空项时，答案使用“|”来分割,单个答案不用添加。
                  <br />4、填空题的填空答案支持输入同义词，用&连接多个同义词答案。
                </p>
                <h3>输入范例</h3>
                <span>1、我国古典四大名著是（ ）（ ）（ ）（ ）。</span>
                <br />
                <span>答案:红楼梦&石头记|水浒传|三国演义|西游记</span>
                <br />
                <span>
                  解析:试题解释
                  <span class="exam-notes">(若无解析本行可不填)</span>
                </span>
                <br />
                <span>
                  标签:
                  <span>内网水巢</span>、
                  <span>数据基因</span>、
                  <span>个人赋能</span>
                </span>
                <br />
                <span>
                  类型:
                  <span>填空</span>
                </span>
                <br />
                <span>
                  难度:
                  <span>简单</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion batch-cont batch-cont-dn">
          <div class="accordion-group">
            <h2>问答题</h2>
            <div id="collapse4" class="b-example accordion-body collapse in">
              <div class="accordion-inner">
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、(1）三种格式。
                  <br />2、支持人工判卷
                </p>
                <h3>输入范例</h3>
                <span>1.请论述全球化对国家政治产生了哪些深刻的影响</span>
                <br />
                <span>答案:全球化使国家主权受到一定的制约； 全球化对政府的治理提出了更高的要求</span>
                <br />
                <span>
                  解析:试题解释
                  <span class="exam-notes">(若无解析本行可不填)</span>
                </span>
                <br />
                <span>
                  标签:
                  <span>内网水巢</span>、
                  <span>数据基因</span>、
                  <span>个人赋能</span>
                </span>
                <br />
                <span>
                  类型:
                  <span>问答</span>
                </span>
                <br />
                <span>
                  难度:
                  <span>简单</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gruber, markArray } from "./makedown.ts";
import { chooseOption } from "./option.ts";
// import store from "@/store";
function sortKey(array, key) {
  return array.sort(function (a, b) {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
export default {
  props: ["value"],
  data() {
    return {
      chooseOption,
      gruber,
      markArray,
      dialogShow: false,
      testQuestions: "",
      itemBankList: [],
      count: 0,
      itemBank: {},
      errorCount: 0,
      sumbitDis: false,
      anArray: [],
      type: "RADIO",
      kg: false,
      arrObj: [
        {
          key: "RADIO",
          name: "单选",
        },
        {
          key: "CHECKBOX",
          name: "复选",
        },
        {
          key: "CHECKBOX",
          name: "多选",
        },
        {
          key: "CHECKED",
          name: "判断",
        },
        {
          key: "GAPFILLING",
          name: "填空",
        },
        {
          key: "ESSAYQUESTION",
          name: "问答",
        },
      ],
    };
  },
  methods: {
    // 查看格式
    handleVisible() {
      this.dialogShow = true;
    },
    //输入内容
    editor(value) {
      this.anArray = [];
      this.sumbitDis = false;
      this.toHtml(value);
    },

    toHtml(value) {
      this.testQuestions = value;
      this.count = 0;
      this.itemBankList = [];
      this.itemBank = { options: [] };
      const input = this.toHtmlTree(value);
      this.renderJsonML(input);
    },

    toHtmlTree(input) {
      let tree;
      if (typeof input === "string") {
        const blocks = input instanceof Array ? input : this.splitBlocks(input);
        tree = [];
        let data = "";
        const typeArr = [];
        // 类型写在下面的时候 上面的东西是需要类型的 所以先得找到提出类型！
        // 然后之前他们是根据题目来划分一提 就是一道题目到另一道题目之间
        for (let i = 0; i < blocks.length; i++) {
          const res = this.gruber.block["qtType"].call(this, blocks[i]);
          if (res) {
            data = res[1];
            typeArr.push(data);
          }
        }
        // 这一步是他需要传入一个类型  但是这个类型本来是在上面的 现在是弄到了输入区 输入区的其他东西需要根据类型区判断 所以需要先传入一个类型
        let num = 0;
        for (let i = 0; i < blocks.length; i++) {
          const res = this.gruber.block["qtTitle"].call(this, blocks[i]);
          if (res) {
            num++;
          }
          const b = this.processBlock(blocks[i], typeArr[num - 1]);
          if (!b.length) continue;
          tree.push(b);
        }
      }
      // const data = tree.some(element => {
      //   if(element[0] === 'answer'){
      //     return true;
      //   }
      // });
      // if(!data){
      //     this.$message('答案和类型不匹配！');
      //     this.sumbitDis = true;
      // }
      return tree;
    },
    // 类型显示转化
    getType(val) {
      let data = "";
      this.arrObj.forEach((element) => {
        if (val && val === element.key) {
          data = element.name;
        }
      });
      return data;
    },
    splitBlocks(input) {
      //将全局的换行/回车符替换为换行符
      input = input.replace(/(\r\n|\n|\r)/g, "\n");
      /**
       * 这里是判断若选项位于同一行，则自动转行，判断依据是选项前有空格且选项后有点或顿号 否则视为同一选项中的内容
       */
      const res = /(\s)+([a-z])([、，,．]|\.)/gi;
      input = input.replace(res, "\n$2$3");
      // 两行中间没有空格也会显示成<p></p><p></p>
      const re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)*)/g,
        blocks = [];
      let m;
      let line_no = 1;
      if ((m = /^(\s*\n)/.exec(input)) != null) {
        line_no += this.countLines(m[0], blocks);
        re.lastIndex = m[0].length;
      }
      while ((m = re.exec(input)) !== null) {
        if (m[2] == "\n#") {
          m[2] = "\n";
          re.lastIndex--;
        }
        blocks.push(this.mkBlock(m[1], m[2], line_no));
        line_no += this.countLines(m[0], blocks);
      }
      return blocks;
    },

    mkBlock(block, trail, line) {
      if (arguments.length == 1) {
        trail = "\n\n";
      }
      let s = new String(block);
      s.trailing = trail;
      if (line) {
        s.lineNumber = line;
      }
      s = s.substr(0, 1).toUpperCase() + s.substr(1, s.length - 1);
      return s.replace(/^([A-Z]|\d+)([、，,．]|\s)/, "$1.");
    },

    countLines(str) {
      let n = 0,
        i = -1;
      while ((i = str.indexOf("\n", i + 1)) !== -1) n++;
      //连续两次或以上换行，视为两道题的分割线
      // if (n>1) blocks.push('-------分割线-------');
      return n;
    },

    processBlock(block, data) {
      const ord = JSON.parse(JSON.stringify(this.markArray));
      // 测试输入单选和单选题 2个东西都需要可以
      for (let i = 0; i < ord.length; i++) {
        const res = this.gruber.block[ord[i]].call(this, block, data);
        if (res) {
          return res;
        }
      }
    },

    renderJsonML(jsonml) {
      for (let i = 0; i < jsonml.length; i++) {
        const title_reg = new RegExp("title");
        // var error_reg = new RegExp('para')
        //这是无法识别出来的内容，统一视为上一项中的内容
        // for (var j = i; j < jsonml.length - 1; j = i) {//都是检测下一项，所以不用再去对最后一行做判断
        // if (error_reg.test(jsonml[j + 1][0])) {//检测当前项的下一项
        //   console.error('error',jsonml[j + 1][1])
        //   jsonml[i][1] += ('\n' + jsonml[j + 1][1])
        //   jsonml.splice(j + 1, 1)
        // } else {
        //   break
        // }
        // }
        // 题目计数
        if (title_reg.test(jsonml[i][0])) {
          this.count++;
        }
        if (this.count > 1) {
          this.itemBankList.push(this.itemBank);
          this.itemBank = { options: [] };
          this.count = 1;
        }
        if (jsonml[i][0].match(/^[A-Z]/)) {
          if (this.countOccurences(this.itemBank.options, jsonml[i][0]) === 0) {
            this.itemBank.options.push({
              key: jsonml[i][0],
              value: jsonml[i][1],
            });
          } else {
            this.itemBank.options.push({
              class: "qt_error",
              key: jsonml[i][0],
              value: jsonml[i][1],
            });
          }
          sortKey(this.itemBank.options, "key");
        } else {
          this.itemBank[jsonml[i][0]] = jsonml[i][1];
        }
      }
      if (this.count === 1) {
        this.itemBankList.push(this.itemBank);
      }
    },

    countOccurences(arr, value) {
      return arr.reduce((a, v) => (v.key === value ? a + 1 : a + 0), 0);
    },
    //提交
    submit() {
      this.errorCount = document
        .getElementById("inspectionContent")
        .getElementsByClassName("qt_error").length;
      if (this.errorCount === 0 && this.itemBankList.length > 0) {
        let data = false;
        // 各种选项的判断
        this.itemBankList.forEach((list, listindexs) => {
          if (list.type == "CHECKBOX") {
            if (list.options.length > 8) {
              data = `第${listindexs + 1}题选项最多8个！`;
            }
            // this.itemBankList.forEach(element => {
            if (list.answer) {
              const nary = list.answer.sort();
              if (list.answer.length < 2) {
                data = `第${listindexs + 1}题多选题答案至少2个！`;
              }
              for (let i = 0; i < list.answer.length; i++) {
                if (nary[i] == nary[i + 1]) {
                  data = `请检查输入区第${listindexs + 1}题是否存在答案重复!`;
                }
                const kg = list.options.every((value) => {
                  return value.key !== nary[i];
                });
                if (kg) {
                  data = `第${listindexs + 1}题答案和选项不匹配！`;
                }
              }
              list.options.forEach((value, index) => {
                list.options.forEach((chil, indexs) => {
                  if (index !== indexs && value.value == chil.value) {
                    data = `请检查输入区第${listindexs + 1}题是否存在选项重复!`;
                  }
                });
              });
            } else {
              data = "答案和选项不匹配！";
            }
            // });
          } else if (list.type == "RADIO") {
            if (list.options.length > 8) {
              data = `第${listindexs + 1}题选项最多8个！`;
            }
            // this.itemBankList.forEach(element => {
            const kg = list.options.every((value) => {
              return value.key !== list.answer;
            });
            if (kg) {
              data = `第${listindexs + 1}题答案和选项不匹配！`;
            }
            for (const key in list) {
              if (key === "ans_error") {
                data = "答案和选项不匹配！";
              }
            }
            list.options.forEach((value, index) => {
              list.options.forEach((chil, indexs) => {
                if (index !== indexs && value.value == chil.value) {
                  data = `请检查输入区第${listindexs + 1}题是否存在选项重复!`;
                }
              });
            });
            // });
          } else {
            this.itemBankList.forEach((element) => {
              for (const key in element) {
                if (key === "ans_error") {
                  data = "答案和选项不匹配！";
                }
              }
            });
          }
        });
        this.itemBankList.forEach((element, index) => {
          const arrLevel = ["简单", "较难", "很难"];
          if (!element.level || arrLevel.indexOf(element.level) === -1) {
            data = `第${
              index + 1
            }题此题没有输入难度!(难度等级请输入'简单','较难','很难')`;
          }
          this.itemBankList.forEach((elements, indexs) => {
            if (
              elements.title === element.title &&
              index !== indexs &&
              elements.type === element.type
            ) {
              data = `第${indexs + 1}题题目重复!`;
            }
          });
          // const dictGroup = store.state.common.dictGroup;
          // const mapName = dictGroup.has("exam_difficulty")
          //   ? dictGroup.get("exam_difficulty")
          //   : [];
          // const allOptions = [...mapName];
          // allOptions.forEach(item => {
          //   if (item.label === element.level) {
          //     element.level = item.value;
          //   }
          // });
          // APP段要求必须 填空要帮他们切一下才做 顺便还要判断下答案不能重复 答案不能为空
          if (element.quesExplain && element.quesExplain.length > 2000) {
            data = `第${index + 1}题解析长度不能超过2000!`;
          }
          if (element.type == "GAPFILLING") {
            element.options = [];
            element.answer.split("|").forEach((elements, indexs) => {
              if (elements === "") {
                data = `第${index + 1}题答案不能为空!`;
              }
              element.options.push({ key: chooseOption[indexs], value: "" });
              element.answer.split("|").forEach((chil, chilindexs) => {
                if (
                  indexs !== chilindexs &&
                  elements == chil &&
                  elements !== ""
                ) {
                  data = `第${index + 1}题答案重复!`;
                }
              });
            });
          }
          // 选择题需要把正确转为A 错误转为B
          if (element.type == "CHECKED") {
            element.options = [
              { key: "A", value: "正确" },
              { key: "B", value: "错误" },
            ];
            if (
              element.answer !== "正确" &&
              element.answer !== "对" &&
              element.answer !== "错误" &&
              element.answer !== "错"
            ) {
              data = `第${index + 1}题此题答案请输入正确或错误`;
            }
          }
          // 有些人写了ACD 然后答案是D 我需要把他转化成ABC 答案是C
          if (element.type == "RADIO" && !data) {
            element.options.forEach((res, indexs) => {
              if (!res.value) {
                data = `第${index + 1}题${chooseOption[indexs]}选项不能为空`;
              }
              if (res.key === element.answer) {
                element.answer = chooseOption[indexs];
              }
              res.key = chooseOption[indexs];
              // 编辑会报错 后端不会返我这个参数 这个是图片参数
              this.$set(res, "optionUrl", "");
            });
          } else if (element.type == "CHECKBOX" && !data) {
            const answer = [];
            element.options.forEach((res, indexs) => {
              if (!res.value) {
                data = `第${index + 1}题${chooseOption[indexs]}选项不能为空`;
              }
              if (element.answer.indexOf(res.key) !== -1) {
                answer.push(chooseOption[indexs]);
              }
              // 编辑会报错 后端不会返我这个参数 这个是图片参数
              this.$set(res, "optionUrl", "");
              res.key = chooseOption[indexs];
            });
            element.answer = answer;
          }
        });
        if (data) {
          this.$message({
            message: `${data}`,
            type: "warning",
          });
          return false;
        }
        this.$emit("submit-batch", this.itemBankList);
      } else {
        this.$message({
          message: "请检查输入区是否填写正确",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang='scss'>
#inspectionContent {
  .el-radio__label {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    word-break: break-all;
    white-space: pre-wrap !important;
  }
  .el-checkbox__label {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    word-break: break-all;
    white-space: pre-wrap !important;
  }
}
.batch-import {
  .input-area {
    flex: 1;
    .input-title {
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      .download {
        font-size: 14px;
        line-height: 42px;
        color: $--color-secondary;
      }
    }
  }

  .inspection-area {
    margin-left: 20px;
    .inspection-title {
      margin-bottom: 15px;
      .error-text {
        margin-left: 10px;
        color: $--color-primary;
      }
    }

    #inspectionContent {
      height: 500px;
      .question {
        position: relative;
        margin-bottom: 17px;
        padding: 15px;
        line-height: 22px;
        font-size: 12px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        background-color: $--background-color;
        border: 1px solid $--border-color;
        border-radius: 10px;
        .qt_error {
          padding-left: 10px;
          margin-bottom: 5px;
          color: #fff;
          font-weight: bold;
          background-color: $--color-primary;
          border-radius: 2px;
          word-wrap: break-word;
          word-break: break-all;
        }
        p {
          font-size: 14px;
          .caption {
            display: inline-block;
            margin-right: 3px;
            font-size: 14px;
            color: $--color-secondary;
          }
        }
        ul {
          padding: 0px;
          list-style: none;
        }
        .el-checkbox {
          display: block;
        }
        li,
        .el-checkbox {
          margin: 0 0 7px 0;
          padding: 4px;
        }
      }
    }
  }
}

.dialog-body {
  margin: 0;
  padding: 0;
  outline: none;
  font-family: "Microsoft yahei";
  .accordion-group {
    h2 {
      text-align: center;
    }
    .b-example {
      h3 {
        line-height: 30px;
        font-size: 16px;
        color: $--color-text-regular;
      }
      .exam-notes {
        color: $--color-primary;
      }
    }
  }
}
</style>


