<template>
  <div>
    <iep-basic-container>
      <div class="know_padding">
        <h1 class="title">
          <span class="title-font">电子签章</span>
        </h1>
        <div>
          <h2 class="h2-font">为企业提供合同全生命周期智能管理服务,帮助企业事项降本增效全领域电子签章解决方案</h2>
        </div>
        <div class="content_title">
          <div class="content_title_main">
            <img src="./pic/pan1.png" />
            <h3>合同签署</h3>
            <p>实名认证、在线签署、批量签署、权限分级</p>
          </div>
          <div class="content_title_main">
            <img src="./pic/book.png" />
            <h3>合同管理</h3>
            <p>合同查询下载、借阅归档、台账信息管理、数据可视化监控、印章管理、文件审批</p>
          </div>
          <div class="content_title_main">
            <img src="./pic/pan2.png" />
            <h3>合同编辑</h3>
            <p>自定义合同编辑、海量免费合同模板、企业专属商用合同</p>
          </div>
          <div class="content_title_main">
            <img src="./pic/pan3.png" />
            <h3>法律服务</h3>
            <p>出证报告、司法鉴定、在线仲裁、律师服务</p>
          </div>
        </div>
        <h2 style="text-align:center;margin-top: 70px;">仅需简单三步,签完一份电子合同</h2>
        <div class="content_title" style="padding-top:20px">
          <div class="content_title_bg">
            <div>
              <i>1.</i>
              <span>实名认证</span>
              <span>
                <img src="./pic/people.png" />
              </span>
            </div>
          </div>
          <div class="fh">
            <img src="./pic/shuangyinhao.png" />
          </div>
          <div class="content_title_bg">
            <div>
              <i>2.</i>
              <span>签发合同</span>
              <span>
                <img src="./pic/book.png" />
              </span>
            </div>
          </div>
          <div class="fh">
            <img src="./pic/shuangyinhao.png" />
          </div>
          <div class="content_title_bg">
            <div>
              <i>3.</i>
              <span>对方签署</span>
              <span>
                <img src="./pic/pan1.png" />
              </span>
            </div>
          </div>
        </div>
        <h2 style="text-align:center;margin: 60px 0 0 0;">对待传统签约方式,say goodbye!</h2>
        <div class="content_title" style="padding-top: 50px">
          <div class="goody_title">
            <img src="./pic/people2.png" />
            <p>电子签章</p>
          </div>
          <div class="goody_content">
            打印合同,来回快递,审批盖章流程繁琐,耗时麻烦
            <div class="bq">效率低</div>
          </div>
          <div class="goody_content">
            快递费用、纸墨消耗、存档管理等资费成本高
            <div class="bq">签约成本高</div>
          </div>
          <div class="goody_content">
            假公章、假签名无法杜绝公章遗失损坏、盗用私盖频发
            <div class="bq">风险高</div>
          </div>
          <div class="goody_content">
            专场保存,专人管理,找份合同花半天,丢份合同一瞬间
            <div class="bq">管理难</div>
          </div>
          <div
            class="goody_content"
            style="width: 100px;line-height:100px;text-align:center;color:#666666;font-size:40px;"
          >···</div>
        </div>
        <div class="content_title content_title_padding">
          <div class="goody_title">
            <img src="./pic/pan3.png" />
            <p>传统签约</p>
          </div>
          <div class="goody_content">
            全程线上签约,秒速签署支持终端签署,支持终端签署,随时随地签合同
            <div class="bq1">便捷高效</div>
          </div>
          <div class="goody_content">
            无需打印、快递合同、云端线上存储管理,成本节省95%以上
            <div class="bq1">低成本签约</div>
          </div>
          <div class="goody_content">
            文件固化+区块链技术、防篡改效果看得见
            <div class="bq1">安全有保障</div>
          </div>
          <div class="goody_content">
            云端存储,永久保存,合同查询、借阅、归档等管理全流程电子化
            <div class="bq1">简单方便</div>
          </div>
          <div
            class="goody_content"
            style="width: 100px;line-height:100px;text-align:center;color:#666666;font-size:40px;padding-top:15px"
          >···</div>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.know_padding {
  padding: 15px;
}
.title {
  text-align: center;

  .title-font {
    font-size: 21px;
    font-weight: 500;
  }
}
h2 {
  font-size: 20px;
}
.h2-font {
  width: 70%;
  text-align: center;
  margin: 0 auto;
  font-size: 18px;
}
.fh {
  img {
    width: 20px;
  }
}
.content_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 100px;
  .content_title_main {
    width: 23%;
    max-width: 320px;
    box-sizing: border-box;
    border-radius: 15px;
    padding: 20px;
    border: 1px solid #eeeeee;
    text-align: center;
    height: 260px;
    h3 {
      font-size: 20px;
    }
    img {
      width: 50px;
      display: block;
      margin: 0 auto;
    }
    p {
      font-size: 17px;
      text-align: left;
      color: #c3c3c3;
    }
  }
}
.content_title_bg {
  width: 25%;
  max-width: 400px;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid #eeeeee;
  text-align: center;
  height: 160px;
  line-height: 120px;
  img {
    width: 50px;
  }
  i {
    color: $--color-input-regular;
    font-size: 30px;
    vertical-align: bottom;
  }
  span {
    line-height: 1;
    vertical-align: middle;
    margin: 0 10%;
  }
}
.goody_title {
  box-sizing: border-box;
  height: 120px;
  width: 10%;
  min-width: 100px;
  border: 1px solid #eeeeee;
  padding: 15px 10px;
  border-radius: 10px;
  img {
    display: block;
    margin: 0 auto;
    width: 50px;
  }
  p {
    text-align: center;
    color: rgba(206, 61, 42);
  }
}
.goody_content {
  height: 120px;
  box-sizing: border-box;
  width: 15%;
  min-width: 200px;
  border: 1px solid #eeeeee;
  padding: 15px 10px;
  border-radius: 10px;
  position: relative;
}
.bq {
  width: 80px;
  background: #f6f6f6;
  padding: 5px 10px;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  left: 50%;
  bottom: -15px;
  margin-left: -50px;
}
.bq1 {
  width: 80px;
  background: #f6f6f6;
  padding: 5px 10px;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: -15px;
  margin-left: -50px;
}
.content_title_padding {
  .goody_content {
    padding-top: 30px;
  }
}
</style>
