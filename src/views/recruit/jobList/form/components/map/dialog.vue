<template>
  <iep-dialog :dialog-show="dialogShow" title="工作地点" width="1000px" @close="resetForm">
    <div class="address-select">
      <div class="left">
        <CascaderCity v-model="place" @change="hanleChange"></CascaderCity>
      </div>
      <div class="right">
        <el-input v-model="address" @keyup.native.enter="handleSubmit">
          <el-button class="el-button" slot="append" @click="handleSubmit">搜索</el-button>
        </el-input>
      </div>
    </div>
    <IepMap
      class="iep-map"
      ref="amap"
      @getAddress="getAddress"
      v-if="dialogShow"
      :options="{center: lnglat}"
    ></IepMap>
    <canvas v-show="false" id="myCanvas" :width="size.width" :height="size.height">当前浏览器不支持canvas</canvas>
    <template slot="footer">
      <el-button type="primary" @click="submitForm" :loading="loadState">保存</el-button>
      <iep-button @click="resetForm" :loading="loadState">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import CascaderCity from "../CascaderCity";
// import { getStaticMap } from "@/api/amap";
import { uploadByCard } from "@/api/admin/appfile";
import { addressCreate, addressUpdate } from "@/api/dms/recruit";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cityTree = require("../city.json");
const initLnglat = () => {
  return [121.59996, 31.197646];
};

export default {
  components: { CascaderCity },
  data() {
    return {
      dialogShow: false,
      loadState: false,
      method: "create",
      methodList: {
        create: {
          requestFn: addressCreate,
        },
        update: {
          requestFn: addressUpdate,
        },
      },
      id: "",
      place: "",
      address: "",
      lnglat: initLnglat(),
      size: {
        width: 700,
        height: 450,
      },
      image: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    open(row = {}) {
      this.dialogShow = true;
      if (row.id) {
        this.id = row.id;
        this.method = "update";
        this.address = row.address;
        this.lnglat = [row.longitude, row.latitude];
        this.$nextTick(() => {
          this.$refs.amap.addMarker(this.lnglat);
        });
      }
      if (row.workplace) {
        this.place = row.workplace;
      }
    },
    resetForm() {
      this.id = "";
      this.place = "";
      this.address = "";
      this.method = "create";
      this.lnglat = initLnglat();
      this.dialogShow = false;
    },
    submitForm() {
      this.loadState = true;
      // 首先要获取到静态地图的截图
      const params = {
        key: "b2e4f6d5a06aaa98be2def6bbbc41caf",
        location: `${this.lnglat[0]},${this.lnglat[1]}`,
        zoom: 16,
        size: `${this.size.width}*${this.size.height}`,
        markers: `mid,,A:${this.lnglat[0]},${this.lnglat[1]}`,
      };
      // 拼接图片地址
      let param = "";
      for (const key in params) {
        param += key + "=" + params[key] + "&";
      }
      const url =
        "https://restapi.amap.com/v3/staticmap?" +
        param.slice(0, param.length - 1);
      this.uploadImg(url).then(data => {
        // 将此地址保存到后端
        const formData = {
          orgId: this.userInfo.orgId,
          address: this.address,
          longitude: this.lnglat[0], // 经度
          latitude: this.lnglat[1], // 纬度
          addressImg: data.url,
        };
        if (this.method === "update") formData.id = this.id;
        this.methodList[this.method].requestFn(formData).then(({ data }) => {
          this.loadState = false;
          if (data) {
            // 关闭地图弹框，并向上抛出返回的数据id
            this.$emit("close", {
              id: data,
              address: this.address,
              place: this.place,
            });
            this.resetForm();
          }
        });
      });
    },
    handleSubmit() {
      // 搜索前先获取到省市信息，在一定范围内进行搜索
      if (this.address === "") return;
      const code = this.getAreaCode(this.place);
      this.$refs.amap.search({ address: this.address, city: code });
    },
    getAddress(address) {
      this.lnglat = address.lnglat;
      // 首先截取具体地点，自区开始获取
      const component = { ...address.addressComponent };
      if (address.formattedAddress) {
        const township = component.city
          ? component.district
          : component.township;
        const index = address.formattedAddress.indexOf(township);
        this.address = address.formattedAddress.slice(index);
        // 截取省市 - app特殊要求，必须要将“省”、“市”字样去掉
        // 这里存在一个问题，上海市浦东新区，是“新区”
        const length = component.district ? component.district.length : 0;
        if (length > 0) {
          if (component.district.slice(length - 2, length) === "新区") {
            component.district = component.district.replace("新区", "区");
          }
        }
        const province = component.province.slice(
          0,
          component.province.length - 1,
        );
        let city = component.city || component.district;
        city = city.slice(0, city.length - 1);
        this.place = province + "-" + city;
      } else {
        this.address = component.name;
      }
    },
    hanleChange(val) {
      console.log(val);
    },
    // 将图片转化成为base64的png然后上传
    uploadImg(img) {
      return new Promise((resolve, reject) => {
        const canvas = document.getElementById("myCanvas");
        const context = canvas.getContext("2d");
        const image = new Image();
        image.src = img;
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          context.drawImage(this, 0, 0);
          const base64 = canvas.toDataURL();
          // base64转成file
          const bytes = window.atob(base64.split(",")[1]);
          const array = [];
          for (let i = 0; i < bytes.length; i++) {
            array.push(bytes.charCodeAt(i));
          }
          const blob = new Blob([new Uint8Array(array)], {
            type: "image/jpeg",
          });
          const fd = new FormData();
          fd.append("file", blob, Date.now() + ".jpg");
          uploadByCard(fd).then(({ data }) => {
            if (data) {
              resolve(data);
            } else {
              reject({});
            }
          });
        };
      });
    },
    getAreaCode(val = "") {
      const place = val.split("-");
      for (const item of cityTree.data) {
        if (item.name === place[0]) {
          for (const t of item.children) {
            if (t.name === place[1]) {
              return item.areaCode;
            }
          }
        }
      }
      return "";
    },
  },
};
</script>
<style lang="scss" scoped>
.address-select {
  margin-bottom: 20px;
  display: flex;
  .left {
    width: 250px;
  }
  .right {
    flex: 1;
    margin-top: 2px;
    .el-button {
      background-color: $--color-primary;
      color: #fff;
      border-color: $--color-primary;
    }
  }
}
.iep-map {
  height: 400px;
}
</style>
