<template>
  <div>
    <div class="header">
      <div class="title">{{form.wareName}}</div>
      <el-button icon="el-icon-check" @click="handleFinishStudy()">标记完成</el-button>
    </div>
    <template v-if="assetUrl">
      <video style="width:100%;" v-if="form.type==1" :src="assetUrl" controls></video>
      <audio style="width:100%;" v-if="form.type==2" :src="assetUrl" controls></audio>
      <SimplePdf style="width:100%;" v-if="form.type==3" :src="assetUrl"></SimplePdf>
      <FileDownload
        style="width:100%;"
        v-if="form.type==4"
        :name="form.wareName"
        :url="form.wareUrl"
      ></FileDownload>
    </template>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getCoursewareById } from "@/api/qms/course_courseware";
import SimplePdf from "./SimplePdf";
import FileDownload from "./FileDownload";
import { mapGetters } from "vuex";
import { setStudyProgress } from "@/api/qms/course_study_situation";
import { CourseWare } from "@/views/course/courseware/options";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const minioHost = process.env.VUE_APP_MINIO_HOST || 'http://183.131.134.242:10158';
export default {
  mixins: [operationMixins],
  props: ["situationId"],
  inject: ["reload"],
  components: {
    SimplePdf,
    FileDownload,
  },
  data() {
    return {
      form: new CourseWare(),
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    course_ware_type() {
      return this.dictGroup.get("course_ware_type");
    },
    id() {
      return this.$route.query.id;
    },
    coursewareId() {
      return this.$route.query.coursewareId;
    },
    assetUrl() {
      if (this.form.wareUrl) {

        // wm-files-20210129/a75c51ec8c1b41e99df8ec2fcf04cc75.mp4
        const wareName = this.form.wareUrl.split("wm-files-")[1];
        return `${minioHost}/wm-files/${wareName}`;
      } else {
        return false;
      }
    },
  },
  watch: {
    "$route.query.id": {
      handler: function () {
        this.loadPage();
      },
      immediate: false,
    },
  },
  mounted() {
    // console.log(this.course_ware_type);
  },
  methods: {
    async loadPage(id = this.id, coursewareId = this.coursewareId) {
      const { data } = await getCoursewareById(coursewareId);
      this.form = this.$mergeByFirst(new CourseWare(), data);
      await setStudyProgress({
        id,
        progress: 2,
        situationId: this.situationId,
      });
    },
    async handleFinishStudy() {
      const data = await this._handleComfirmNOID(
        {
          id: this.id,
          progress: 3,
          situationId: this.situationId,
        },
        setStudyProgress,
        "",
        "确认已完成此章节?",
        "操作成功",
      );
      if (data) {
        this.reload();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  .title {
    color: $--color-text-primary;
  }
}
</style>
