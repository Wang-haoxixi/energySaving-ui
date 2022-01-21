<template>
  <div class="section-header">
    <div class="section-name">
      <div class="section-number">第{{nzhCn(section.sectionNumber)}}章</div>
      <template v-if="disabled">
        <el-input :value="section.sectionName" disabled></el-input>
        <el-button class="opt-btn" icon="el-icon-edit" @click="handleEdit()">编辑</el-button>
      </template>
      <template v-else>
        <el-input v-model="sectionName" :maxlength="100" placeholder="请输入标题"></el-input>
        <el-button class="opt-btn" icon="el-icon-check" @click="handleOk()">确认</el-button>
      </template>
    </div>
    <i class="el-icon-delete point-hover" @click="handleDel()"></i>
  </div>
</template>
<script>
import nzhcn from "nzh/cn";
import {
  putInfoSectionName,
  delInfoSection,
} from "@/api/qms/course_info_section";
export default {
  name: "SectionHeader",
  props: ["section"],
  data() {
    return {
      disabled: true,
      sectionName: "",
    };
  },
  methods: {
    nzhCn(number) {
      return nzhcn.encodeS(number);
    },
    handleEdit() {
      this.sectionName = this.section.sectionName;
      this.disabled = false;
    },
    async handleOk() {
      console.log(this.section);
      const { data } = await putInfoSectionName({
        infoId: this.section.infoId,
        sectionName: this.sectionName,
        sectionNumber: this.section.sectionNumber,
      });
      console.log(data);
      this.disabled = true;
      this.$emit("load-page");
    },
    async handleDel() {
      this.$confirm("是否删除大章节", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await delInfoSection({
            infoId: this.section.infoId,
            sectionNumber: this.section.sectionNumber,
          });
          console.log(data);
          this.$emit("load-page");
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.point-hover {
  cursor: pointer;
  &:hover {
    color: $--color-primary;
  }
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .section-name {
    display: flex;
    align-items: center;
    flex: 0 0 500px;
    .section-number {
      flex: 0 0 100px;
    }
    .opt-btn {
      margin-left: 10px;
    }
  }
}
</style>
