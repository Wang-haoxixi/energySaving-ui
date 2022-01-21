<template>
  <div class="table">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <!-- 样例 -->
      <iep-table :isLoadTable="false" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable">
      </iep-table>
    </iep-basic-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columnsMap: [
        {
          prop: "sender",
          label: "评价人",
          width: 180,
        },
        {
          prop: "title",
          label: "主题",
        },
        {
          prop: "date",
          label: "发送时间",
          width: 180,
        },
      ],
      pagedTable: [
        {
          sender: "国四借",
          date: "2016-05-02",
          title: "关于发布品牌, 平台与研究委员会2020工作要求的通知",
        },
        {
          sender: "国四借",
          date: "2016-05-04",
          title: "关于发布品牌, 平台与研究委员会2020工作要求的通知",
        },
        {
          sender: "国四借",
          date: "2016-05-01",
          title: "关于发布品牌, 平台与研究委员会2020工作要求的通知",
        },
        {
          sender: "国四借",
          date: "2016-05-03",
          title: "关于发布品牌, 平台与研究委员会2020工作要求的通知",
        },
      ],
    };
  },
};
</script>
