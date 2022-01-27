<template>
  <div>
    <div class="top-banner">
      <div class="center">
        <iep-img src="/img/zswh/zswhz.png"></iep-img>
      </div>
    </div>
    <div class="item">
      <h4>什么是知识网红</h4>
      <div
        class="item-con"
      >知识网红是指具有专业知识、技能的人，通过网络进行学习、生存和发展，经营自己的事业的一批专业人士（含小规模组织）。是网络时代的先进生产力和生产方式的代表，也是依靠自己的知识技能、在网络进行创新创业和创意的代表，必将成为网络世界里面的精英分子和成功人士的代表。</div>
    </div>
    <div class="item">
      <h4>成为知识网红的目的</h4>
      <div class="item-box">
        <div class="item-box-con">
          <span>
            <i class="el-icon-woneng-qianneng"></i>
          </span>
          <span>发挥自我潜能</span>
        </div>
        <div class="item-box-con">
          <span>
            <i class="el-icon-woneng-pinpai"></i>
          </span>
          <span>塑造个人品牌IP</span>
        </div>
        <div class="item-box-con">
          <span>
            <i class="el-icon-woneng-pengyou"></i>
          </span>
          <span>结交更多志同道合的朋友</span>
        </div>
        <div class="item-box-con">
          <span>
            <i class="el-icon-woneng-chuanbo"></i>
          </span>
          <span>将知识广泛传播</span>
        </div>
      </div>
    </div>
    <div class="principle-bg">
      <div class="item">
        <h4>知识网红遵循的原则</h4>
        <div class="item-box">
          <div class="three-box">
            <span>不忘初心（诚信）</span>
            <p>知识网红拥有着大量的粉丝，这群人是基于信任、价值等才会持续关注和消费产品。如想成为持续爆红的知识网红就务必将诚信放在首位，让粉丝无条件相信的言论和观点。</p>
          </div>
          <div class="three-box">
            <span>不忘初心（诚信）</span>
            <p>有价值的内容自然会有流量，会有人持续关注，这是想要成为知识网红的。</p>
          </div>
          <div class="three-box">
            <span>持续输出</span>
            <p>优质原创内容只有持续输出，不断引起粉丝共鸣，从而吸引大量的有效流量。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>优秀知识网红的十大标准动作</h4>
      <div class="item-list">
        <span>养成天天使用专业平台的习惯；</span>
        <span>每周通过群聊在线或问卷形式与粉丝互动了解他们的喜好；</span>
        <span>每日阅读热门、推荐、高质量文章，不断吸收能量；</span>
        <span>每周发起话题供粉丝互动探讨；</span>
        <span>每日关注其他优秀知识网红的动态及运营策略；</span>
        <span>每周发布机会促进协作；</span>
        <span>每日阅读热门、推荐、高质量文章，不断吸收能量；</span>
        <span>每月参与考试提升自我行业水平；</span>
        <span>每日参与各种机会，让更多人认可你；</span>
        <span>每月可举办一场直播会议积累粉丝。</span>
      </div>
    </div>
    <div class="bottom-box">
      <div class="item">
        <h4>如何成为优秀知识网红</h4>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="秘籍一" name="first">
            <div class="bottom-tab-pane">
              <h5>明确定位，垂直细化</h5>
              <div class="con">
                <p>在你有想成为知识网红的那一刻开始，就要认真思考以下问题：</p>
                <span>1、你成为知识网红的优势是什么？</span>
                <span>2、你最擅长/最想学习的领域是什么，能解决什么问题？</span>
                <span>3、你的粉丝是谁？</span>
                <p>想清楚以上问题之后，就可以着手准备开干，先在节能宝或其他平台上注册账号，提交清晰的logo、并描述清楚定位、行业领域、及服务内容。这里提醒各位即将成为知识网红的你，切记定位过于宽泛，没有找准自身定位而翻车，尽量定位垂直细化的行业。如纯粹某个行业的干货观点、技能指导等。</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="秘籍二" name="second">
            <div class="bottom-tab-pane">
              <h5>内容制胜，打造个人IP</h5>
              <div class="con">
                <p>每个知识网红都是独特的个体，想要明显区别于其他知识网红，就要建立个性鲜明、情感饱满的人物形象，形成自有的写作风格、表达方式、语言特色、内容调性。利用“节能宝”中的个人说说发表感悟和观点，通过个人专栏文章输出个人原创或半原创的优质文章，策划推出个人会议活动、协作机会清单，持续不断地输出人格化的相关内容，系统打造个人IP，扩大影响力。在此基础上，内容尤其是原创内容显得尤为重要。上传的材料要有足够的吸引力，具有特色，产生流量效应。</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="秘籍三" name="third">
            <div class="bottom-tab-pane">
              <h5>组织运营，聚集志同道合的伙伴共同成功</h5>
              <div class="con">
                <p>一个知识网红的成功势必是一个团队的功劳，因此想要做一个成为持续爆红的知识网红，成立自己的团队建立组织是必须必经过程。具体组织的运营可以参考组织运营指南。</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="秘籍四" name="fourth">
            <div class="bottom-tab-pane">
              <h5>灵活运用，知识变现</h5>
              <div class="con">
                <p>俗话说，与凤凰同飞，必是俊鸟；与狮虎同走，终成猛兽。若你是新手，想快速成长为知识网红，可以在“节能宝”向高级知识网红拜师，可以是通过红人堂，或者是好友推荐，找到你想拜师的对象，在线发起拜师，收获成长。熟悉“节能宝”各个模块，融会贯通，比如想找人协作，可以在组织中发起任务需求，或是发至机会工场，跨界协作；想找到某方面的材料或者问卷等，用过搜索键，快速查询；想要举办会议，去发现频道中的活动中实现；想要发布产品，或者购买商品，去魔方模块中实现等，“节能宝”为知识网红提供多样服务，实现资源最优化匹配，加速知识变现，实现共赢。</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="秘籍五" name="fifth">
            <div class="bottom-tab-pane">
              <h5>灵活运用，知识变现</h5>
              <div class="con">
                <p>在“节能宝”用心经营自身的账号，包括组织，长期输出，不断与粉丝互动，如定期发布一些话题或活动，经常互动交流，让粉丝感觉被重视，增加信任感，达到固粉效果。从内容、活动、用户、渠道等多方面运营账号和组织，实现组织、个人数字化转型，成为更优秀的知识网红。在运营中，知识网红还要拥有正确的价值观，不断提升自我，服务社会，遵守“节能宝”规则，持续运营，积累数字财富，提升红度，感召更多用户关注，不断从初级知识网红，向资深知识网红进阶，为企业、组织、个人发展带来更大的驱动力。总的来说，想成为知识网红，想不断进阶成为资深知识网红，就是一个找准自身定位、明确内容导向、满足用户需求、打造特色IP、持续运营输出、积累数字资产的过程。</p>
                <p>最后，衷心祝愿每位用户在节能宝成长蜕变为资深知识网红，为人生不断赋能，拥抱更美好的未来。</p>
                <p>《知识网红的爆红秘籍》持续更新，敬请期待，若你有好的创意想法，欢迎来节能宝投稿，一经采纳奖励18.88宝贝。</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-banner {
  height: 280px;
  background-image: url("/img/zswh/zsbhb.jpg");
  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  .center {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 1200px;
    height: 280px;
    &::before {
      position: absolute;
      content: "";
      top: 20%;
      right: 12%;
      width: 280px;
      height: 178px;
      background: url("/img/zswh/zswh2.png");
    }
    &::after {
      position: absolute;
      content: "";
      top: 20%;
      left: 5.5%;
      width: 208px;
      height: 412px;
      background: url("/img/zswh/zswh1.png");
    }
  }
}
.item {
  margin: 0 auto;
  width: 1200px;
  h4 {
    margin: 50px 0 40px;
    font-size: 24px;
    text-align: center;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .item-con {
    font-size: 16px;
    line-height: 36px;
    text-indent: 2em;
    text-align: justify;
    color: #666769;
  }
  .item-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 40px;
    .item-box-con {
      align-items: center;
      width: 25%;
      text-align: center;
      &:hover {
        transform: scale(1.1);
        transform: translateY(-5px);
        transition: all 0.3s;
      }
      span {
        margin: 0 auto;
        background-color: #fff;
        &:nth-child(1) {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          width: 105px;
          height: 105px;
          border-radius: 50%;
          border: 1px solid $--border-color;
          i {
            font-size: 60px;
            color: $--color-primary;
          }
        }
        &:nth-child(2) {
          font-size: 16px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
      }
    }
    .three-box {
      padding: 30px;
      width: 380px;
      height: 220px;
      line-height: 30px;
      background-color: #fff;
      border: 1px solid $--border-color;
      border-radius: 10px;
      box-sizing: border-box;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
      }
      span {
        display: block;
        font-size: 18px;
        text-align: center;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
      p {
        font-size: 14px;
        color: $--color-text-regular;
      }
    }
  }
  .item-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 80px;
    margin-bottom: 60px;
    background-color: #fff;
    span {
      position: relative;
      display: block;
      padding: 15px 10px 15px 60px;
      border: 1px solid $--border-color;
      border-radius: 26px;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
      }
      &::before {
        position: absolute;
        content: "";
        top: 10px;
        left: 10px;
        width: 34px;
        height: 34px;
        font-size: 14px;
        text-align: center;
        line-height: 34px;
        background: linear-gradient(
          135deg,
          rgba(247, 68, 55, 1),
          rgba(255, 130, 96, 1)
        );
        color: #fff;
        border-radius: 50%;
      }
      &:nth-child(1)::before {
        content: "01";
      }
      &:nth-child(2)::before {
        content: "06";
      }
      &:nth-child(3)::before {
        content: "02";
      }
      &:nth-child(4)::before {
        content: "07";
      }
      &:nth-child(5)::before {
        content: "03";
      }
      &:nth-child(6)::before {
        content: "08";
      }
      &:nth-child(7)::before {
        content: "04";
      }
      &:nth-child(8)::before {
        content: "09";
      }
      &:nth-child(9)::before {
        content: "05";
      }
      &:nth-child(10)::before {
        content: "10";
      }
    }
  }
}
.principle-bg {
  display: flex;
  align-items: center;
  height: 380px;
  background-image: url("/img/zswh/zswhbg2.jpg");
  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;
  h4 {
    margin: 40px 0;
  }
}
.bottom-box {
  position: relative;
  padding: 40px 0 100px;
  background-color: $--background-color;
  &::after {
    position: absolute;
    content: "";
    bottom: 10%;
    right: 10%;
    width: 404px;
    height: 296px;
    background-image: url("/img/zswh/zswh3.png");
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  &::before {
    position: absolute;
    content: "";
    left: 45%;
    bottom: 3%;
    width: 220px;
    height: 224px;
    background-image: url("/img/zswh/duoyuan.png");
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  h4 {
    margin-top: 0;
  }
  .bottom-tab-pane {
    h5 {
      margin-bottom: 20px;
      font-size: 18px;
      color: $--color-primary;
    }
    .con {
      width: 60%;
      min-height: 200px;
      font-size: 14px;
      line-height: 36px;
      p {
        margin: 10px 0;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
      span {
        display: block;
        font-weight: 600;
      }
    }
  }
  ::v-deep .el-tabs__header {
    margin-bottom: 75px;
    text-align: center;
    border-bottom: 1px solid $--border-color;
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
      .el-tabs__active-bar::before {
        left: 0;
        margin-left: 0;
        width: 100%;
        height: 3px;
      }
    }
    .el-tabs__item {
      padding: 0 85px;
      font-size: 16px;
    }
  }
  ::v-deep .el-tabs__content {
    margin: 0 40px;
  }
}
</style>
