<template>
  <div>
    <single-election v-if="data.type == '1'" :data="data" :disabled="disabled"></single-election>
    <multiple-election v-if="data.type == '2'" :data="data" :disabled="disabled"></multiple-election>
    <img-select v-if="data.type == '3'" :data="data" :disabled="disabled"></img-select>
    <multiple-img-select v-if="data.type == '4'" :data="data" :disabled="disabled"></multiple-img-select>
    <select-election v-if="data.type == '5'" :data="data" :disabled="disabled"></select-election>
    <fill-blank v-if="data.type == '6'" :data="data" :disabled="disabled"></fill-blank>
    <multiple-fill-blank v-if="data.type == '7'" :data="data" :disabled="disabled"></multiple-fill-blank>
    <scoring v-if="data.type == '8'" :data="data" :disabled="disabled"></scoring>
    <file-upload v-if="data.type == '9'" :data="data" :disabled="disabled"></file-upload>
    <remarks v-if="data.type == '10'" :data="data" :disabled="disabled"></remarks>
    <!-- <concluding v-if="data.type == '11'" :data="data" :disabled="disabled"></concluding> -->
  </div>
</template>
<script>
import singleElection from "./singleElection";
import multipleElection from "./multipleElection";
import imgSelect from "./imgSelect";
import multipleImgSelect from "./multipleImgSelect";
import selectElection from "./select";
import fillBlank from "./fillBlank";
import multipleFillBlank from "./multipleFillBlank";
import scoring from "./scoring";
import fileUpload from "./fileUpload";
import remarks from "./remarks";
// import concluding from "./concluding";
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    singleElection,
    multipleElection,
    imgSelect,
    multipleImgSelect,
    selectElection,
    fillBlank,
    multipleFillBlank,
    scoring,
    fileUpload,
    remarks,
    // concluding,
  },
};
</script>