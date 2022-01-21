<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>

      <el-collapse v-model="activeName" accordion>
        <FilesUpload></FilesUpload>

        <TagComponent></TagComponent>

        <GlobalSimpleUser></GlobalSimpleUser>

        <GlobalMutipleUser></GlobalMutipleUser>

        <MutipleContacts></MutipleContacts>

        <SimpleContact></SimpleContact>

        <OrgSelect></OrgSelect>

        <DataPicker></DataPicker>

        <ImageUpload></ImageUpload>

        <DatePickerRange></DatePickerRange>

        <JoditEditor></JoditEditor>

        <Gallery></Gallery>
      </el-collapse>
    </iep-basic-container>
  </div>
</template>
<script>
import FilesUpload from "./FilesUpload";
import TagComponent from "./TagComponent";
import GlobalSimpleUser from "./GlobalSimpleUser";
import GlobalMutipleUser from "./GlobalMutipleUser";
import MutipleContacts from "./MutipleContacts";
import SimpleContact from "./SimpleContact";
import OrgSelect from "./OrgSelect";
import DataPicker from "./DataPicker";
import ImageUpload from "./ImageUpload";
import DatePickerRange from "./DatePickerRange";
import JoditEditor from "./JoditEditor";
import Gallery from "./Gallery";
export default {
  components: {
    FilesUpload,
    TagComponent,
    GlobalSimpleUser,
    GlobalMutipleUser,
    MutipleContacts,
    SimpleContact,
    OrgSelect,
    DataPicker,
    ImageUpload,
    DatePickerRange,
    JoditEditor,
    Gallery,
  },
  data() {
    return {
      activeName: "1",
    };
  },
};
</script>
<style lang="scss" scoped>
.component-box {
  padding: 10px 20px;
  background: rgb(250, 250, 250);
  border: 1px solid $--border-color;
  margin-bottom: 10px;
}
</style>
