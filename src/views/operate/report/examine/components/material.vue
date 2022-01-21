<template>
  <iep-basic-container class="examine-container">
    <el-col class="container">
      <iep-page-header :title="data.materialName"></iep-page-header>

      <el-row class="info">
        <div class="person">
          <iep-popover-user-card :user-id="data.createBy" v-if="data.createBy" class="popover">
            <div class="create">
              <iep-img class="avatar" :src="data.avatar"></iep-img>
              <div class="name">{{data.realName}}</div>
            </div>
          </iep-popover-user-card>
          <div class="date">{{data.createTime}}</div>
        </div>
      </el-row>
      <el-row class="sub-title">{{data.materialIntro}}</el-row>
      <el-row class="content">
        <iep-jodit-read v-model="data.materialContent"></iep-jodit-read>
        <div class="createUser">作者：{{data.createUser}}</div>
      </el-row>
      <el-row class="down-load" v-if="data.attachFile">
        相关附件：
        <div class="file">
          <div>
            <i class="icon-fujian"></i>
            {{data.original}}
          </div>
        </div>
      </el-row>
      <el-row class="footer" v-if="data.tag && data.tag.length > 0">
        <div class="footer-left">
          <el-tag type="danger" v-for="(item, index) in data.tag" :key="index">{{item}}</el-tag>
        </div>
      </el-row>
    </el-col>
  </iep-basic-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      materialTotal: 0,
      greatMaterialList: [],
      isDelete: true,
    };
  },
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-wrap: wrap;
    .person {
      flex: 1;
      display: flex;
      font-size: 14px;
      .create {
        display: flex;
        cursor: pointer;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          margin-right: 10px;
          border: 1px solid $--border-color;
          box-sizing: border-box;
        }
        .name {
          line-height: 30px;
        }
      }
      .date {
        color: $--color-text-secondary;
        line-height: 30px;
      }
      .icon {
        line-height: 20px;
        margin-right: 5px;
      }
      > div,
      .popover {
        margin-right: 20px;
      }
    }
    .operat {
      display: flex;
      line-height: 18px;
      .button {
        margin-right: 10px;
        color: $--color-text-regular;
        i {
          font-size: 16px !important;
        }
      }
    }
    .classes {
      width: 100%;
      div {
        display: inline-block;
      }
    }
  }
  .sub-title {
    padding: 20px;
    font-size: 14px;
    line-height: 28px;
    text-align: justify;
    background-color: $--background-color;
  }
  .content {
    padding: 20px;
    .createUser {
      margin-top: 32px;
      font-size: 14px;
      color: $--color-text-secondary;
    }
    .pay {
      text-align: center;
      // display: flex;
      width: 100%;
      margin: auto;
      cursor: pointer;
      .hr {
        display: inline-block;
        color: #bbb;
      }
      .pay-button {
        display: inline-block;
        margin: 0 10px;
        font-size: 14px;
        color: $--color-text-secondary;
      }
    }
  }
  .substance {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 32px;
    height: 66px;
    overflow: hidden;
  }
  .down-load {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    .file {
      margin-top: 15px;
      font-size: 14px;
      cursor: pointer;
      color: $--color-primary;
      &:hover {
        opacity: 0.7;
      }
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: $--color-text-secondary;
      }
      &:hover i,
      &:hover .tip {
        color: $--color-primary;
      }
    }
  }
  .footer {
    justify-content: space-between;
    border-top: 1px solid $--border-color;
    padding-top: 20px;
    .el-button {
      margin-left: 10px;
    }
    .footer-left {
      float: left;
      text-align: left;
      margin-bottom: 10px;
      .el-tag {
        margin: 0 10px 10px 0;
      }
    }
    .footer-right {
      float: right;
      .wrong {
        cursor: pointer;
        i {
          font-size: 16px !important;
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
}
.rate {
  width: 160px;
  display: inline-block;
  font-size: 28px;
}
</style>

<style scoped>
.footer-right >>> .five-key {
  padding: 0;
}
.footer-right >>> .icon-box {
  margin: 5px;
}
.img >>> .el-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.img >>> .el-image__inner {
  border-radius: 50%;
}
</style>
