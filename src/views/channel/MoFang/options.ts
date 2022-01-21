import { typesMap, dictsMap } from '@/views/cpms/options';
import store from "@/store";
export const typeMap = dictsMap.type;
const categoryOption = () => {
  const cOption = [{
    id: '',
    name: '全部',
    child: [],
  }];
  if (store.state.common) {
    // const { dictGroup } = store.state.common;
    // const getDictByName = (name: string) => {
    //   return dictGroup.get(name) || [];
    // };
    return {
      typeList: [
        ...cOption,
        ...typesMap.map(m => ({
          id: m.key,
          name: m.name,
          // child: getDictByName(m.category).map(m => {
          //   return {
          //     id: m.value,
          //     name: m.label,
          //   };
          // }),
        })),
      ],
    };
  } else {
    return cOption;
  }
};

const tabList = typesMap.filter(m => m.key !== 0).map(m => ({
  label: m.name,
  value: String(m.key),
}));

const tabListAll = typesMap.map(m => ({
  label: m.name,
  value: String(m.key),
}));
export {
  categoryOption,
  tabList,
  tabListAll,
};
