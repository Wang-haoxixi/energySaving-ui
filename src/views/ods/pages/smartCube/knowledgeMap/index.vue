<template>
  <div>
    <iep-basic-container>
      <div class="know_padding">
        <h1 class="title">
          <span class="title-font">知识图谱</span>
        </h1>
        <div>
          <h2 class="h2-font">
            显示知识发展进程与结构关系的一系列各种不同的图形，用可视化技术描述知识资源及其载体，挖掘、分析、构建、
            绘制和显示知识及它们之间的相互联系。
          </h2>
        </div>
        <div class="content">
          <div class="box">
            <div class="box-left">
              <div style="text-align: center;">
                <img src="./pic/picture1.png" class="img" />
              </div>
              <span class="content-font">有什么用？</span>
            </div>
            <div class="box-right">
              <p>
                1、用户搜索次数越多，范围越广，搜索引擎就能获取越多信息和内容。
                <br />2、赋予字串新的意义，而不只是单纯的字串。
                <br />3、为用户找出更加准确的信息，作出更全面的总结并提供更有深度相关的信息。
                <br />4、把与关键词相关的知识体系系统化地展示给用户。
                <br />
              </p>
            </div>
          </div>
          <div class="box">
            <div class="box-left">
              <div style="text-align: center;">
                <img src="./pic/picture2.png" class="img" />
              </div>
              <span class="content-font">是什么？</span>
            </div>
            <div class="box-right">
              <p>
                是真实世界的语义表示 ，其中每一个节点代表实体连接节点的边则对应实体之间的关系。
                <br />异构数据通过整合表达为知识 图的表达映射了节点与实体之间的关系。
              </p>
            </div>
          </div>
        </div>
        <h1 class="title" style="padding: 40px 0px;">
          <span>三大功能</span>
        </h1>
        <div style="position:relative;height:300px">
          <hr />
            <div style="position:absolute;top: -14.5px;left: 14%;">
              <div class="Odiv">1</div>
              <div class="container1">
                <div class="content1">
                <h3>图谱探索</h3>
                <p>以一个中心实体为视角，以图谱可视化的方式查看于其存在关联关系的实体.</p>
                </div>
                <s>
                <i></i>
                </s>
              </div>
            </div>
            <div style="position:absolute;top: -14.5px;left: 49%;">
              <div class="Odiv">2</div>
              <div class="container1">
                <div class="content1">
                <h3>路径发现</h3>
                <p>在一个基于人物、机构等实体形成的一个网络关系图中,查询任意两个主体</p>
                </div>
                <s>
                <i></i>
                </s>
              </div>
            </div>
            <div style="position:absolute;top: -14.5px;left: 84%;">
              <div class="Odiv">3</div>
              <div class="container1">
                <div class="content1">
                <h3>关联分析</h3>
                <p>在一个基于人物、机构等实体形成的一个网络关系图中,查询任意多</p>
                </div>
                <s>
                <i></i>
                </s>
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
  div.container1 {
    box-sizing: border-box;
    position: absolute;
    top: 45px;
    left: -130px;
    font-size: 9pt;
    display: block;
    height: 120px;
    width: 300px;
    background-color: transparent;
    border-radius: 20px;
    *border: 1px solid #eeeeee;
  }
  h3 {
    margin: 10px 0 5px 0;
  }
  s {
    position: absolute;
    top: -20px;
    *top: -22px;
    left: 135px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent #eeeeee transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
  }

  i {
    position: absolute;
    top: -9px;
    *top: -9px;
    left: -10px;
    display: block;
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    border-color: transparent transparent #fff transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
  }

  .content1 {
    box-sizing: border-box;
    border: 1px solid #eeeeee;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    position: absolute;
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 5px;
    padding: 5px 10px;
    border-radius: 17px;
    *top: -2px;
    *border-top: 1px solid #eeeeee;
    *border-top: 1px solid #eeeeee;
    *border-left: none;
    *border-right: none;
    *height: 102px;
    /* For IE 5.5 - 7 */
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#999999');
    /* For IE 8 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#999999')";
  }

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

  .h2-font {
    width: 70%;
    text-align: center;
    margin: 0 auto;
    font-size: 18px;
  }

  .content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 40px;
  }

  .box {
    border: 1px solid gainsboro;
    border-radius: 10px;
    width: 40%;
    padding: 20px;
    height: 180px;
    font-size: 14px;

    .box-left {
      display: inline-block;
      width: 25%;
      height: 100px;
      text-align: center;
      vertical-align: top;

      .img {
        width: 40%;
      }

      .content-font {
        font-size: 18px;
        font-weight: 500;
      }
    }

    .box-right {
      width: 70%;
      display: inline-block;
    }
  }

  .Odiv {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: #f0f1f5;
    text-align: center;
    line-height: 30px;
  }

  .speech-bubble {
    position: relative;
    background-color: white;
    border: 1px solid black;
    width: 200px;
    height: 150px;
    line-height: 150px;
    /* 垂直居中 */
    color: white;
    text-align: center;
    border-radius: 10px;
    font-family: sans-serif;
  }

  .speech-bubble:after {
    content: "";
    position: absolute;

    width: 0;
    height: 0;

    border: 15px solid;
  }

  /* 箭头的位置 */
  .speech-bubble-top:after {
    border-bottom-color: #292929;
    left: 50%;
    bottom: 100%;
    margin-left: -15px;
  }

</style>
