import Vue from "vue";

import IcanButton from '@/components/Ican/Common/Button.vue';

const components = [
  // 按钮
  IcanButton,
];

components.forEach(component => {
  Vue.component(component.name, component);
});
