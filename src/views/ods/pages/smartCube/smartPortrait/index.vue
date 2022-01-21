<template>
  <div>
    <iep-basic-container>
      <div class="know_padding">
        <h1 class="title">
          <span class="title-font">智能画像</span>
        </h1>
        <div>
          <h2 class="h2-font">多维标签分类,实时场景控制;行为深度洞察,构建全面、精准、多维的用户画像体系</h2>
        </div>
        <div class="content_title">
          <div class="content_title_main">
            <img src="./pic/tag.png" />
            <h3>丰富多维标签</h3>
            <p>覆盖众多独立设备,全面覆盖属性、兴趣、行为、场景等各维度细分标签,帮助360度勾勒立体用户画像</p>
          </div>
          <div class="content_title_main">
            <img src="./pic/connect.png" />
            <h3>数据实时连续</h3>
            <p>数据连续性高,可用性强,AI深度分析,算法精准,支持回溯兴趣行为偏好,也可实时甄别当下场景需求</p>
          </div>
          <div class="content_title_main">
            <img src="./pic/pic.png" />
            <h3>画像极速产出</h3>
            <p>支持自助标签生成自定义画像,毫秒级输出标签,可补全各领域用户画像标签,建模能力强,产出能力高</p>
          </div>
          <div class="content_title_main">
            <img src="./pic/net.png" />
            <h3>定制联合建模</h3>
            <p>支持个性数据结合需求方数据共同联合建模,产出个性化特征标签,满足客户的定制化需求</p>
          </div>
        </div>
        <div class="content_title">
          <div class="xian1"></div>
          <div class="xian2"></div>
          <div class="xian3"></div>
          <div class="xian4"></div>
          <div>
            <div class="content_main">
              <span>个人信息</span>
              <div>年龄</div>
              <div>性别</div>
              <div>出生日期</div>
              <div>学历</div>
              <div>手机号</div>
              <div>...</div>
            </div>
            <div class="content_main">
              <span>用户偏好</span>
              <div>产品类别</div>
              <div>价格区间</div>
              <div>产品品牌</div>
            </div>
            <div class="content_main">
              <span>渠道信息</span>
              <div>来源域名</div>
              <div>来源平台</div>
              <div>来源类型</div>
            </div>
          </div>
          <div class="img_content">
            <img src="./pic/backgroud.png" />
          </div>
          <div>
            <div class="content_main">
              <span>用户行为</span>
              <div>最近访问时间</div>
              <div>首次访问时间</div>
              <div style="width: 200px;">最后一次使用平台</div>
              <div>页面信息</div>
              <div>...</div>
            </div>
            <div class="content_main">
              <span>用户地区</span>
              <div>所在国家</div>
              <div>所在省份</div>
              <div>所在城市</div>
              <div>...</div>
            </div>
            <div class="content_main">
              <span>设备信息</span>
              <div>浏览器</div>
              <div>操作系统</div>
              <div>MAC</div>
              <div>...</div>
            </div>
          </div>
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
  width: 1200px;
  box-sizing: border-box;
  padding: 15px;
  margin: 0 auto;
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
  position: relative;
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
.content_main {
  background: white;
  width: 300px;
  border: 1px solid #eee;
  text-align: center;
  border-radius: 10px;
  padding: 10px 0;
  position: relative;
  margin-top: 40px;
  div {
    width: 100px;
    display: inline-block;
    text-align: center;
    background: #f5f5f5;
    border-radius: 15px;
    margin: 10px;
    padding: 3px 0;
  }
  span {
    display: block;
    position: absolute;
    top: -12px;
    left: 10%;
    background: white;
    padding: 0 7px;
    color: #ca2009;
  }
}
.xian1 {
  position: absolute;
  width: 300px;
  height: 200px;
  top: 200px;
  border: 1px solid #eeeeee;
  left: 231px;
  z-index: 0;
  border-left: 0;
}
.xian2 {
  position: absolute;
  width: 300px;
  height: 200px;
  top: 200px;
  border: 1px solid #eeeeee;
  right: 231px;
  z-index: 0;
  border-right: 0;
}
.xian3 {
  position: absolute;
  width: 300px;
  height: 200px;
  bottom: 60px;
  right: 231px;
  z-index: 0;
  border-left: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.xian4 {
  position: absolute;
  width: 300px;
  height: 200px;
  bottom: 60px;
  left: 231px;
  z-index: 0;
  border-left: 0;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.img_content {
  img {
    position: relative;
    width: 300px;
  }
}
</style>
