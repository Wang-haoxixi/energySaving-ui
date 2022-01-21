import Vue from "vue";

// 操作按钮组件名
import IepOperationTableBtnGroup from "@/components/IepOperation/TableBtnGroup.vue";
import IepOperationCommonGroup from "@/components/IepOperation/CommonGroup.vue";

// 富文本
import IepJoditEditor from "@/components/IepJoditEditor/index.vue";
import IepJoditRead from "@/components/IepJoditEditor/read.vue";

// 公共组件
import IepPagination from "@/components/IepCommon/Pagination.vue";
import IepNoData from "@/components/IepCommon/NoData.vue";
import IepEmpty from "@/components/IepCommon/Empty.vue";
import IepWrong from '@/components/IepCommon/Wrong.vue';
import IepToDev from "@/components/IepToDev/index.vue";
import IepCharts from "@/components/IepCommon/ECharts.vue";
import IepBasicContainer from "@/components/IepCommon/BasicContainer.vue";
import IepOperationWrapper from "@/components/IepCommon/OperationWrapper.vue";
import IepOperationSearch from "@/components/IepCommon/OperationSearch.vue";
import IepOperationContainer from "@/components/IepCommon/OperationContainer.vue";
import IepPageHeader from "@/components/IepCommon/PageHeader.vue";
import IepImg from "@/components/IepImg/index.vue";
import IepImgViewer from '@/components/IepImg/imageViewer.vue';
import IepCard from "@/components/IepCard/index.vue";
import IepTabs from "@/components/IepCommon/Tabs.vue";
import IepWrapper from "@/components/IepCommon/Wrapper.vue";
import IepReviewConfirm from "@/components/IepCommon/ReviewConfirm.vue";
import IepTip from "@/components/IepCommon/Tip.vue";
import IepSelect from "@/components/IepCommon/Select.vue";
import IepReview from "@/components/IepCommon/Review.vue";
import IepDropdown from "@/components/IepCommon/Dropdown.vue";
import IepRelationChart from "@/components/IepRelationChart/index.vue";

// 表单组件
import IepFormItem from "@/components/IepForm/FormItem.vue";
import IepDivDetail from "@/components/IepForm/DivDetail.vue";
import IepDatePicker from "@/components/IepForm/DatePicker.vue";
import IepJsonTable from "@/components/IepForm/JsonTable.vue";
import IepDictSelect from "@/components/IepForm/DictSelect.vue";
import IepCascader from "@/components/IepForm/Cascader.vue";

// input
import IepInputAmount from "@/components/IepInput/InputAmount.vue";
import IepInputNumber from "@/components/IepInput/InputNumber.vue";
import IepInputArea from "@/components/IepInput/InputArea.vue";
import IepAntInput from "@/components/IepInput/AntInput.vue";

// 弹出层相关组件
import IepDialog from "@/components/IepDialog/index.vue";
import IepDialogMessage from "@/components/IepDialog/message.vue";

// 表格相关组件
import IepCrudTable from "@/components/IepCrudTable/index.vue";
import IepTable from "@/components/IepTable/index.vue";
import IepTableLink from "@/components/IepTable/Link.vue";
import IepTableLinkImgDesc from "@/components/IepTable/LinkImgDesc.vue";
import IepTableHeaderSetting from "@/components/IepTable/HeaderSetting.vue";
import IepTableDensity from "@/components/IepTable/Density.vue";

// 上传组件
import IepUpload from "@/components/IepUpload/index.vue";
import IepUploadAvatar from "@/components/IepUpload/Avatar.vue";
import IepUploadPoster from "@/components/IepUpload/Poster.vue";
import IepUploadSelect from "@/components/IepUpload/Select.vue";
import IepUploadAvatarWrapper from "@/components/IepUpload/Wrapper.vue";
import IepPicListUpload from "@/components/IepUpload/PicList.vue";
import IepSingleImgUpload from "@/components/IepUpload/SingleImg.vue";
import IepOssUpload from "@/components/IepUpload/Oss/index.vue";
import IepOssUploadSelect from "@/components/IepUpload/Oss/select.vue";
// 切换框滚动锚点
import IepTabScroll from "@/components/IepTabScroll/index.vue";

import IepFooterBar from "@/components/IepFooterBar/index.vue";

//关联标签
import IepTag from "@/components/IepTag/index.vue";

//Custom
import IepButton from "@/components/IepCustom/Button.vue";
import IepRadioGroup from "@/components/IepCustom/RadioGroup.vue";
import IepLink from "@/components/IepCustom/Link.vue";
import IepIcon from "@/components/IepCustom/Icon.vue";
import IepDataItem from "@/components/IepCustom/DataItem.vue";

// 频道页组件
import IepAppTabCard from "@/components/IepApp/TabCard.vue";
import IepAppTabsCard from "@/components/IepApp/TabsCard.vue";
import IepAppRankingCard from "@/components/IepApp/RankingCard.vue";
import IepAppListCard from "@/components/IepApp/ListCard.vue";

const components = [
  // 操作按钮组件名
  IepOperationTableBtnGroup,
  IepOperationCommonGroup,
  //富文本
  IepJoditEditor,
  IepJoditRead,
  // 公共组件
  IepPagination,
  IepNoData,
  IepEmpty,
  IepWrong,
  IepToDev,
  IepCharts,
  IepBasicContainer,
  IepOperationWrapper,
  IepOperationSearch,
  IepOperationContainer,
  IepPageHeader,
  IepImg,
  IepImgViewer,
  IepCard,
  IepTabs,
  IepWrapper,
  IepReviewConfirm,
  IepTip,
  IepSelect,
  IepReview,
  IepDropdown,
  IepRelationChart,
  // 表单组件
  IepFormItem,
  IepDivDetail,
  IepDatePicker,
  IepJsonTable,
  IepDictSelect,
  IepCascader,
  // Input
  IepInputNumber,
  IepInputAmount,
  IepInputArea,
  IepAntInput,
  // 弹出层相关组件
  IepDialog,
  IepDialogMessage,
  // 表格相关组件
  IepCrudTable,
  IepTable,
  IepTableLink,
  IepTableLinkImgDesc,
  IepTableHeaderSetting,
  IepTableDensity,
  // 上传组件
  IepUpload,
  IepUploadAvatar,
  IepUploadPoster,
  IepUploadSelect,
  IepUploadAvatarWrapper,
  IepPicListUpload,
  IepSingleImgUpload,
  IepOssUpload,
  IepOssUploadSelect,
  // 切换框滚动锚点
  IepTabScroll,
  //提交表单页脚
  IepFooterBar,
  //关联标签
  IepTag,
  //Custom
  IepRadioGroup,
  IepButton,
  IepLink,
  IepIcon,
  IepDataItem,
  // 说说页面卡片组件
  IepAppTabCard,
  IepAppTabsCard,
  IepAppRankingCard,
  IepAppListCard,
];
components.forEach(component => {
  Vue.component(component.name, component);
});
