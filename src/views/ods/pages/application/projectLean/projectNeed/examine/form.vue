<template>
  <div class="iep-page-form" style="padding: 20px 10%;">
    <iep-page-header title :backOption="backOption"></iep-page-header>
    <h1>项目概况</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="项目性质:">
        <el-radio-group v-model="form.resource">
          <el-radio label="新建"></el-radio>
          <el-radio label="续建"></el-radio>
          <el-radio label="运维"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否泄密:">
        <el-radio-group v-model="form.resource1">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目开始年度:">
        <el-date-picker
          type="date"
          placeholder="请输入项目开始年度"
          v-model="form.date1"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="项目结束年度:">
        <el-date-picker
          type="date"
          placeholder="请输入项目结束年度"
          v-model="form.date2"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="启动年限:">
        <el-radio-group v-model="form.resource2">
          <el-radio label="当年补报项目"></el-radio>
          <el-radio label="下一年度项目"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <h1>建设单位信息</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="项目名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="建设单位:">
        <el-input v-model="form.name1"></el-input>
      </el-form-item>
      <el-form-item label="职能:">
        <el-input v-model="form.name2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="实施机构:">
        <el-input v-model="form.name3" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="职能:">
        <el-input v-model="form.name4" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人:">
        <el-input v-model="form.name5" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="职务:">
        <el-input v-model="form.name5" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="项目联系人:">
        <el-input v-model="form.name6" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <el-input v-model="form.name7" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:">
        <el-input v-model="form.name8" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input v-model="form.name9" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱:">
        <el-input v-model="form.name10" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <h1>项目背景</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="建设期:">
        <el-input v-model="form.name11"></el-input>
      </el-form-item>
      <el-form-item label="项目管理分类:">
        <el-input v-model="form.name12"></el-input>
      </el-form-item>
      <el-form-item label="业务类型:">
        <el-input v-model="form.name13"></el-input>
      </el-form-item>
      <el-form-item label="项目运行网络环境:">
        <el-checkbox-group v-model="form.name14">
          <el-checkbox label="政务外网" name="type"></el-checkbox>
          <el-checkbox label="互联网" name="type"></el-checkbox>
          <el-checkbox label="政务专员" name="type"></el-checkbox>
          <el-checkbox label="政务内网" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="行业类型:">
        <el-checkbox-group v-model="form.name15">
          <el-checkbox label="党建" name="type"></el-checkbox>
          <el-checkbox label="教育" name="type"></el-checkbox>
          <el-checkbox label="医疗" name="type"></el-checkbox>
          <el-checkbox label="社保" name="type"></el-checkbox>
          <el-checkbox label="社区" name="type"></el-checkbox>
          <el-checkbox label="扶贫" name="type"></el-checkbox>
          <el-checkbox label="体育" name="type"></el-checkbox>
          <el-checkbox label="文化" name="type"></el-checkbox>
          <el-checkbox label="旅游" name="type"></el-checkbox>
          <el-checkbox label="农业" name="type"></el-checkbox>
          <el-checkbox label="气象" name="type"></el-checkbox>
          <el-checkbox label="交通" name="type"></el-checkbox>
          <el-checkbox label="警务" name="type"></el-checkbox>
          <el-checkbox label="城管" name="type"></el-checkbox>
          <el-checkbox label="市场监督" name="type"></el-checkbox>
          <el-checkbox label="安检" name="type"></el-checkbox>
          <el-checkbox label="检务" name="type"></el-checkbox>
          <el-checkbox label="审计" name="type"></el-checkbox>
          <el-checkbox label="环保" name="type"></el-checkbox>
          <el-checkbox label="信用" name="type"></el-checkbox>
          <el-checkbox label="其他" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="客户端:">
        <el-checkbox-group v-model="form.name16">
          <el-checkbox label="pc端" name="type"></el-checkbox>
          <el-checkbox label="移动端" name="type"></el-checkbox>
          <el-checkbox label="自动端" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否调研:">
        <el-switch v-model="form.name17" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="建设内容简介:">
        <el-input v-model="form.name18"></el-input>
      </el-form-item>
    </el-form>
    <h1>建设必要性</h1>
    <hr />
    <iep-table
      :isPagination="false"
      border
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :isLoadTable="false"
    ></iep-table>
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="必要性描述:">
        <el-input v-model="form.name11"></el-input>
      </el-form-item>
    </el-form>
    <h1>建设可行性</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="新技术应用:">
        <el-switch v-model="form.name19" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="实施保障:">
        <el-input v-model="form.name20"></el-input>
      </el-form-item>
    </el-form>
    <h1>需求分析与建设目标</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="政务目标:">
        <iep-table
          :isPagination="false"
          border
          :columnsMap="columnsMap1"
          :pagedTable="pagedTable"
          :isLoadTable="false"
        ></iep-table>
      </el-form-item>
      <el-form-item label="业务目标:">
        <iep-table
          :isPagination="false"
          border
          :columnsMap="columnsMap2"
          :pagedTable="pagedTable"
          :isLoadTable="false"
        ></iep-table>
      </el-form-item>
      <el-form-item label="技术目标:">
        <iep-table
          :isPagination="false"
          border
          :columnsMap="columnsMap3"
          :pagedTable="pagedTable"
          :isLoadTable="false"
        ></iep-table>
      </el-form-item>
    </el-form>
    <h1>总体技术框架</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="框架图:">
        <el-button type="danger">点击上传</el-button>
      </el-form-item>
      <el-form-item label="技术框架阐述:">
        <el-input v-model="form.name21" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="应用系统建设:">
        <iep-table
          :isPagination="false"
          border
          :columnsMap="columnsMap4"
          :pagedTable="pagedTable"
          :isLoadTable="false"
        ></iep-table>
      </el-form-item>
    </el-form>
    <h1>安全系统建设</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="网络安全:">
        <el-input v-model="form.name21" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="数据安全:">
        <el-input v-model="form.name22" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="信息安全:">
        <el-input v-model="form.name23" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <h1>项目上云情况</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="是否上云:">
        <el-switch v-model="form.name24" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <el-input v-model="form.name25" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="硬件建设方案:">
        <el-input v-model="form.name26" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="是否无条件归集到市大数据平台:">
        <iep-table
          :isPagination="false"
          border
          :columnsMap="columnsMap5"
          :pagedTable="pagedTable"
          :isLoadTable="false"
        ></iep-table>
      </el-form-item>
    </el-form>
    <h1>项目预算管理</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="项目总投资(万):">
        <el-input v-model="form.name27" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="投资估算组成:">
        <el-checkbox-group v-model="form.name28">
          <el-checkbox label="硬件(万)" name="type"></el-checkbox>
          <el-checkbox label="软件(万)" name="type"></el-checkbox>
          <el-checkbox label="配套(万)" name="type"></el-checkbox>
          <el-checkbox label="其他(万)" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="资金来源:">
        <iep-table
          :isPagination="false"
          border
          :columnsMap="columnsMap6"
          :pagedTable="pagedTable"
          :isLoadTable="false"
        ></iep-table>
      </el-form-item>
    </el-form>
    <h1>预算估算明细列表</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="硬件设备购置费(万元):">
        <iep-table
          border
          :columnsMap="columnsMap7"
          :pagedTable="pagedTable"
          :isLoadTable="false"
          :isPagination="false"
        ></iep-table>
      </el-form-item>
    </el-form>
    <h1>预计收益</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="政府部门(个):">已选5（市本级部门3个，区县市2个，开放区0个）</el-form-item>
      <el-form-item label="市本级部门:">
        <el-input v-model="form.name29" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="区县市:">
        <el-input v-model="form.name30" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="开发区:">
        <el-input v-model="form.name31" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="市民（人):">
        <el-input v-model="form.name32" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="企业（家):">
        <el-input v-model="form.name33" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="提升行政效率:">
        <el-input v-model="form.name34" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="减少人工【人/年】:">
        <el-input v-model="form.name35" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="减少办公场地【平米】:">
        <el-input v-model="form.name36" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="节省设备耗材成本【万元/年】:">
        <el-input v-model="form.name37" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <h1>相关文件上传</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="相关文件上传:">
        <el-button>点击上传</el-button>
      </el-form-item>
      <el-form-item label="项目备注:">
        <el-button>点击上传</el-button>
      </el-form-item>
    </el-form>
    <h1>发起流程</h1>
    <hr />
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      style="padding: 20px 5%;"
      :disabled="true"
    >
      <el-form-item label="申报说明:">
        <el-input v-model="form.name38" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    firstClass: {
      type: Array,
      default: () => {},
    },
    isDialog: {
      type: Boolean,
      default: false,
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
      form: {},
      activeName: "first",
      columnsMap: [
        {
          label: "相关选项",
          porop: "name",
        },
        {
          label: "名称",
          porop: "name1",
        },
        {
          label: "文号",
          porop: "name",
        },
        {
          label: "相关内容",
          porop: "name",
        },
      ],
      columnsMap1: [
        {
          label: "职能",
          porop: "name",
        },
        {
          label: "目标描述",
          porop: "name1",
        },
      ],
      columnsMap2: [
        {
          label: "业务指标/用户指标",
          porop: "name",
        },
        {
          label: "单位",
          porop: "name1",
        },
        {
          label: "目标描述",
          porop: "name1",
        },
      ],
      columnsMap3: [
        {
          label: "技术性能指标",
          porop: "name",
        },
        {
          label: "单位",
          porop: "name1",
        },
        {
          label: "目标描述",
          porop: "name1",
        },
      ],
      columnsMap4: [
        {
          label: "子系统/功能模块",
          porop: "name",
        },
        {
          label: "建设内容",
          porop: "name1",
        },
      ],
      columnsMap5: [
        {
          label: "资源提供方",
          porop: "name",
        },
        {
          label: "资源性质",
          porop: "name1",
        },
        {
          label: "原始数据表（中文）",
          porop: "name1",
        },
        {
          label: "原始数据表（英文）",
          porop: "name1",
        },
        {
          label: "原始字段名（中文）",
          porop: "name1",
        },
        {
          label: "原始字段名（英文）",
          porop: "name1",
        },
        {
          label: "申报字段名（中文）",
          porop: "name1",
        },
        {
          label: "申报字段名（英文）",
          porop: "name1",
        },
      ],
      columnsMap6: [
        {
          label: "资金来源",
          porop: "name",
        },
        {
          label: "详细描述",
          porop: "name1",
        },
        {
          label: "资金",
          porop: "name1",
        },
      ],
      columnsMap7: [
        {
          label: "资金来源",
          porop: "name",
        },
        {
          label: "详细描述",
          porop: "name1",
        },
        {
          label: "资金",
          porop: "name1",
        },
      ],
      pagedTable: [],
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    addInput(name) {
      const obj = {
        id: null,
        lawId: null,
        content: "",
      };
      this[name].push(obj);
    },
    cutInput(idx, name) {
      this[name].splice(idx, 1);
    },
    open(row) {
      this.formData = row;
      this.innerIpList = row.innerIpList;
      this.macAddrList = row.macAddrList;
    },
    loadPage() {
      this.$emit("load-page", true);
    },
    resetForm() {
      this.$refs["form"].resetFields();
      // this.formData = initForm();
      this.dialogShow = false;
    },
    submitForm() {
      if (this.active !== 5) {
        this.active++;
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.iep-page-form ::v-deep .el-form-item__content div {
  width: 100%;
}
.download {
  cursor: pointer;
}
.isCertified-tip {
  position: absolute;
  top: 25px;
  font-size: 12px;
  color: $--color-primary;
}
.half-line {
  width: 50%;
  display: inline-block;
}
.lawTerms {
  display: flex;
  width: 100%;
  .btnMargin {
    margin-left: 10px;
  }
}
.full-width {
  width: 100%;
}

.lawTerms + .lawTerms {
  margin-top: 20px;
}
</style>
