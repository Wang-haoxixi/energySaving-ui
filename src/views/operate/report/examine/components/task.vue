<template>
  <iep-basic-container class="examine-container">
    <el-col class="container">
      <iep-page-header :title="data.title"></iep-page-header>
      <div class="content">
        <div class="item" v-for="(item, index) in formList" :key="index">
          <div class="label">{{item.name}}：</div>
          <div class="span" v-if="item.type === 'textarea'">
            <pre>{{data[item.value]}}</pre>
          </div>
          <div class="span" v-else>{{data[item.value]}}</div>
        </div>
        <div class="item">
          <div class="label">协作人：</div>
          <div class="span">
            <div class="user-list">
              <div
                class="user-block"
                v-for="(item, index) in data.cooperationTaskUserVOList"
                :key="index"
              >
                <iep-img class="user-avatar" :src="item.avatar" :title="item.userRealName"></iep-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </iep-basic-container>
</template>

<script>
export default {
  props: {
    data: {
      default: () => {},
    },
  },
  data() {
    return {
      formList: [
        {
          name: "截止时间",
          value: "finishTime",
        },
        {
          name: "归属组织",
          value: "orgName",
        },
        {
          name: "描述",
          value: "description",
          type: "textarea",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .content {
    .item {
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 80px;
        text-align: right;
      }
      .span {
        width: calc(100% - 80px);
        .user-list {
          display: flex;
          flex-wrap: wrap;
          .user-block {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            margin: 0 15px 15px 0;
            position: relative;
          }
        }
      }
    }
  }
}
pre {
  white-space: pre-wrap; /* css3.0 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  margin: 0;
}
</style>
