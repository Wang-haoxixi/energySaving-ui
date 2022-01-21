<template>
  <div class="map-container">
    <div :style="{width:'100%',height:'100%'}">
      <el-amap vid="amap-vue" class="amap" :center="center" :events="events"></el-amap>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueAMap from "vue-amap";

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  // 高德key
  key: "909fa274f1a87afcc80c9a66a9286285",
  // 插件集合 （插件按需引入）
  plugin: ["Geocoder"],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4",
});

export default {
  name: "IepMap",
  data() {
    return {
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        click: val => {
          this.handleClick(val);
        },
      },
      markers: [],
    };
  },
  methods: {
    handleClick(row) {
      const { lng, lat } = row.lnglat;
      console.log([lng, lat]);
      let address = "";

      // 这里通过高德 SDK 完成。
      const geocoder = new VueAMap.Geocoder({
        radius: 1000,
        extensions: "all",
      });
      console.log([lng, lat]);
      geocoder.getAddress([lng, lat], function(status, result) {
        if (status === "complete" && result.info === "OK") {
          if (result && result.regeocode) {
            address = result.regeocode.formattedAddress;
            self.$nextTick();
          }
        }
      });
      console.log("address: ", address);
    },
    search(address) {
      console.log("address: ", address);
    },
    addMarker() {
      const lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      const lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers.push([lng, lat]);
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length,
        };
        this.mapCenter = [center.lng, center.lat];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
}
</style>