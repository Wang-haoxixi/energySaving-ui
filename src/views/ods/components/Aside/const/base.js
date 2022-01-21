import {
  mockMenuDataBase,
} from "./mock";
import {
  assetsysMenuData,
} from "./assetSys";
import applicationMenuData from './application';

const mockMenuData = mockMenuDataBase.concat(assetsysMenuData, applicationMenuData);

export {
  mockMenuData,
};
