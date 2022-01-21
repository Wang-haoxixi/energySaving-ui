
<template>
  <div class="map-container">
    <div id="amap_container"></div>
  </div>
</template>

<script>
/***
 * vue-amap的插件库存在问题，现在使用的是CDM引入方式，以后有空了再对问题进行解决
 * 遇到的问题：new VueAMap.Geocoder失败，报错不存在此插件，详情可见index2文件
 */
let map = {};
export default {
  name: "IepMap",
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      geocoder: {},
      marker: undefined,
    };
  },
  computed: {
    isClick() {
      return this.options.isClick === undefined;
    },
  },
  methods: {
    initMap() {
      const options = {
        resizeEnable: true,
        center: [121.59996, 31.197646],
      };
      map = new window.AMap.Map(
        "amap_container",
        Object.assign({}, options, this.options),
      );
      // 绑定点击事件
      map.on("click", this.handleClick);
      // 初始化正逆地点转换
      this.initGeocoder();
      if (this.options.isCode) {
        this.$nextTick(() => {
          this.addMarker(this.options.center, true);
        });
      }
    },
    // 点击事件
    handleClick(e) {
      this.getAddressByLnglat([e.lnglat.getLng(), e.lnglat.getLat()]).then(
        address => {
          this.$emit("getAddress", address);
          console.log("handleClick: ", address);
          // 地图上面进行标记
          this.addMarker(address.lnglat);
        },
      );
    },
    // 删除标记
    removeMarker() {
      map.remove([this.marker]);
    },
    initGeocoder() {
      window.AMap.plugin("AMap.Geocoder", () => {
        this.geocoder = new window.AMap.Geocoder();
      });
    },
    // 根据经纬度获取地点
    getAddressByLnglat(lnglat = []) {
      return new Promise((resolve, reject) => {
        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            const address = result.regeocode;
            address.lnglat = lnglat;
            resolve(address);
          } else {
            reject(new Error(undefined));
          }
        });
      });
    },
    // 实例化点标记
    addMarker(lnglat = [], defaultClick = false) {
      if (this.isClick || defaultClick) {
        if (!this.marker) {
          this.marker = new window.AMap.Marker({
            icon: "/img/map/poi-marker-default.png",
            position: lnglat,
            offset: new window.AMap.Pixel(-13, -30),
          });
          this.marker.setMap(map);
        } else {
          this.marker.setPosition(lnglat); // 更新点标记位置
        }
      }
    },
    // 搜索
    search(row = {}) {
      window.AMap.plugin("AMap.PlaceSearch", () => {
        // 构造地点查询类
        const placeSearch = new window.AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: row.city, // 兴趣点城市
          citylimit: row.city, //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          // panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        // 关键字查询
        placeSearch.search(row.address);
        window.AMap.event.addListener(placeSearch, "markerClick", e => {
          const lnglat = [e.data.location.lng, e.data.location.lat];
          console.log("e: ", e);
          const adress = {
            lnglat: lnglat,
            addressComponent: e.data,
          };
          this.$emit("getAddress", adress);
          this.removeMarker();
        });
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
#amap_container {
  width: 100%;
  height: 100%;
  &::v-deep .amap-icon {
    img {
      width: 25px;
      height: 34px;
    }
  }
}
</style>