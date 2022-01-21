import Vue from "vue";

// 特有组件
import IepUserCard from "@/views/Components/Card/User.vue";
import IepPopoverUserCard from "@/views/Components/Popover/User.vue";
import IepOrgCard from "@/views/Components/Card/Org.vue";
import IepPopoverOrgCard from "@/views/Components/Popover/Org.vue";
import IepTagInput from "@/views/Components/TagInput/index.vue";
import IepCustomSelect from "@/views/Components/CustomSelect/index.vue";
//新增编辑赋能组件
import IepEmpowerment from "@/views/Components/Empowerment/index.vue";
// tag
import IepTagRead from "@/views/Components/TagInput/read.vue";
import IepTags from "@/views/Components/TagInput/Tags.vue";
// user
import IepUsersInput from "@/views/Components/UsersInput/index.vue";
import IepUserInput from "@/views/Components/UserInput/index.vue";
// contact 通讯录
import IepContactInput from "@/views/Components/ContactInput/index.vue";
import IepContactsInput from "@/views/Components/ContactsInput/index.vue";

// 弹出框
import IepDialogSendNotice from "@/views/Components/Dialog/SendNotice.vue";
import IepDialogInviteMember from "@/views/Components/Dialog/InviteMember.vue";
import IepDialogInviteSetting from "@/views/Components/Dialog/InviteSetting.vue";
import IepDialogOrgCharge from "@/views/Components/Dialog/OrgCharge.vue";
import IepDialogWechat from "@/views/Components/Dialog/Wechat.vue";
import IepDialogInviteUserSo from "@/views/Components/Dialog/InviteUserSo.vue";
import IepDialogInviteSoUser from "@/views/Components/Dialog/InviteSoUser.vue";
import IepDialogCreateFriend from "@/views/Components/Dialog/CreateFriend.vue";
import IepDialogCreateMentor from "@/views/Components/Dialog/CreateMentor.vue";
import IepDialogPrizeSuggest from "@/views/Components/Dialog/PrizeSuggest.vue";
import IepDialogReqJoinSo from "@/views/Components/Dialog/ReqJoinSo.vue";
import IepDialogTransferSo from "@/views/Components/Dialog/TransferSo.vue";
import IepDialogTransferNb from "@/views/Components/Dialog/TransferNb.vue";
import IepDialogPermission from "@/views/Components/Dialog/Permission.vue";
import IepDialogComment from "@/views/Components/Dialog/Comment.vue";
import IepDialogSecurityStrategy from "@/views/Components/Dialog/SecurityStrategy.vue";
import IepDialogRoleUserSelect from "@/views/Components/Dialog/RoleUserSelect.vue";
// 自定义公共组件
// 这个是邀请中间公共部分组件
import IepCustomInviteMember from "@/views/Components/Custom/InviteMember.vue";
// 这个是名片卡片组件
import IepCardBtn from "@/views/Components/Custom/CardBtn.vue";
// 这个是关注样式组件
import IepFollowBtn from "@/views/Components/Custom/FollowBtn.vue";
import IepHoverBtn from "@/views/Components/Custom/HoverBtn.vue";
// 这个是JSONTABLE 专用 wrap
import IepShowWrap from "@/views/Components/Custom/ShowWrap.vue";
// 这个是密码强度简化输入框组件
import IepPasswordAuto from "@/views/Components/Custom/PasswordAuto.vue";
// 个人小头像
import IepUserSmallCard from "@/views/Components/Custom/UserSmallCard.vue";
// 这个是知事列表框框
import IepMagistratesBox from '@/views/Components/Custom/MagistratesBox.vue';
// 这个是活动卡片
import IepActivityCard from '@/views/Components/Custom/ActivityCard.vue';
// 这是课程卡片
import IepCourseCard from '@/views/Components/Custom/CourseCard.vue';
// 问卷行
import IepQuesListItem from "@/views/Components/Custom/QuesListItem.vue";
//问卷单元格
import IepQuesGridItem from "@/views/Components/Custom/QuesGridItem.vue";
// 动态说说行
import IepSoDynamic from "@/views/Components/Custom/SoDynamic.vue";
// 任务行
import IepTaskColumn from "@/views/Components/Custom/TaskColumn.vue";
// 产品与服务
import IepProductItem from "@/views/Components/Custom/ProductItem.vue";
// 材料行
import IepMaterialItem from "@/views/Components/Custom/MaterialItem.vue";
// 通用的用户简单展示卡片用来关注
import IepUserSimpleCard from "@/views/Components/Custom/UserSimpleCard.vue";
// 智能推荐用户卡片
import IepSmartUserCard from '@/views/Components/Custom/SmartUserCard.vue';
// 角色标识
import IepIdentitySvg from "@/views/Components/Custom/IdentitySvg.vue";
// 角色树
import IepRoleTree from '@/views/Components/Custom/RoleTree.vue';
// 红度icon
import IepRednessIcon from "@/views/Components/Custom/RednessIcon.vue";
// 收藏BTN
import IepCollectionBtn from "@/views/Components/Custom/CollectionBtn.vue";

// -----------------------

// Select
import IepSelectCity from "@/views/Components/Select/City.vue";
import IepSelectIndustry from "@/views/Components/Select/Industry.vue";
import IepSelectPosition from "@/views/Components/Select/Position.vue";
import IepSelectCommonList from "@/views/Components/Select/CommonList.vue";
import IepCommonSelect from "@/views/Components/Select/Common.vue";
import IepDictsMapSelect from "@/views/Components/Select/DictsMap.vue";
import IepSelectSearchAllOrg from "@/views/Components/Select/SearchAllOrg.vue";
// Cascader
import IepCascaderIndustry from "@/views/Components/Cascader/Industry.vue";
import IepCascaderPosition from "@/views/Components/Cascader/Position.vue";
import IepCascaderProfession from "@/views/Components/Cascader/Profession.vue";
import IepCascaderCity from "@/views/Components/Cascader/City.vue";
// 自己的组织
import IepOrgSelect from "@/views/Components/Select/Org.vue";
//带建议输入
import IepCrmsSelect from "@/views/Components/Autocomplete/CrmsSelect.vue";
//带至今日期选择器
import IepDatePickerWithNow from "@/views/Components/Custom/DatePickerWithNow.vue";
//2个选择器拼接的范围选择器
import IepDatePickerRange from "@/views/Components/Custom/DatePickerRange.vue";
//搜索栏
import IepOdsSearch from "@/views/Components/search/search.vue";
// 地图
import IepMap from "@/views/Components/Map/index.vue";
// 公共评论
import CommonComment from "@/views/Components/Comment/index.vue";
//海报图库
import IepGallery from "@/views/Components/Custom/Gallery.vue";

const components = [
  // 特有组件
  IepUserCard,
  IepPopoverUserCard,
  IepOrgCard,
  IepPopoverOrgCard,
  IepCustomSelect,
  IepEmpowerment,
  // tag
  IepTagInput,
  IepTagRead,
  IepTags,
  // user
  IepUsersInput,
  IepUserInput,
  // contact 通讯录
  IepContactInput,
  IepContactsInput,
  // 弹出框
  IepDialogSendNotice,
  IepDialogInviteMember,
  IepDialogInviteSetting,
  IepDialogOrgCharge,
  IepDialogWechat,
  IepDialogInviteUserSo,
  IepDialogInviteSoUser,
  IepDialogCreateFriend,
  IepDialogCreateMentor,
  IepDialogPrizeSuggest,
  IepDialogReqJoinSo,
  IepDialogTransferSo,
  IepDialogTransferNb,
  IepDialogPermission,
  IepDialogComment,
  IepDialogSecurityStrategy,
  IepDialogRoleUserSelect,
  // Custom
  IepCustomInviteMember,
  IepCardBtn,
  IepFollowBtn,
  IepHoverBtn,
  IepShowWrap,
  IepPasswordAuto,
  IepUserSmallCard,
  IepMagistratesBox,
  IepActivityCard,
  IepCourseCard,
  IepQuesListItem,
  IepQuesGridItem,
  IepSoDynamic,
  IepTaskColumn,
  IepProductItem,
  IepMaterialItem,
  IepUserSimpleCard,
  IepSmartUserCard,
  IepIdentitySvg,
  IepRoleTree,
  IepRednessIcon,
  IepCollectionBtn,
  // Select
  IepSelectCity,
  IepSelectIndustry,
  IepSelectPosition,
  IepSelectCommonList,
  IepCommonSelect,
  IepOrgSelect,
  IepDictsMapSelect,
  IepSelectSearchAllOrg,
  // Cascader
  IepCascaderIndustry,
  IepCascaderPosition,
  IepCascaderProfession,
  IepCascaderCity,
  //带建议输入
  IepCrmsSelect,
  //带至今日期选择器
  IepDatePickerWithNow,
  IepDatePickerRange,
  IepOdsSearch,
  // 地图
  IepMap,
  // 评论
  CommonComment,
  //海报图库
  IepGallery,
];

components.forEach(component => {
  Vue.component(component.name, component);
});
