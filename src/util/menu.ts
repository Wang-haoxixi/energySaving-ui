import store from "@/store";
import Layout from '@/layouts/index.vue';
import { IepMenuGroupItem } from '@/types/menu';

function addPath(ele: any, parentMenu?: any) {
  const pPath: string = parentMenu?.path || '';
  const ePath: string = ele.path;
  if (parentMenu
    && !pPath.startsWith("/spa")
    && !ePath.startsWith("/")
  ) {
    ele.path = [pPath, ePath].join("/");
  }
  const isChild = ele.children?.length !== 0;
  if (!isChild) {
    ele.children = [];
  } else {
    ele.children.forEach((child: any) => {
      addPath(child, ele);
    });
  }
}

const transToMenu = (menuList: any) => {
  const menuRouter = [...menuList];
  menuRouter.forEach(m => {
    addPath(m);
  });
  return menuRouter;
};

const transToRouter = (menuList: any, parentMenu?: any): any => {
  const menuRouter = [];
  for (let i = 0; i < menuList.length; i++) {

    const aMenu = menuList[i];
    const isChild = aMenu.children.length !== 0;
    const type = +aMenu.type;

    // menu 各个属性
    const path = aMenu.path;
    const menuPath = (() => {
      if (parentMenu) {
        return `${parentMenu.menuPath}/${aMenu.path}`;
      } else {
        return aMenu.path;
      }
    })();
    aMenu.menuPath = menuPath;
    const name = (() => {
      if (parentMenu) {
        return `${parentMenu.name}-${aMenu.name}`;
      } else {
        return `${aMenu.name}`;
      }
    })();
    aMenu.name = name;
    const breadcrumb = name.split("-");
    aMenu.breadcrumb = breadcrumb;
    const _componentName = (() => {
      if (type === 0 || isChild) {
        return aMenu.component;
      } else {
        return `views${aMenu.component}`;
      }
    })();
    aMenu._componentName = _componentName;
    const component = () => import(`@/${_componentName}.vue`);
    const icon = aMenu.icon;
    const redirect = aMenu.redirect;
    const children = !isChild ? [] : transToRouter(aMenu.children, aMenu);
    const meta = {
      name: aMenu.label,
      breadcrumb,
    };
    // 组装对象
    const menuItem = {
      _componentName,
      children,
      component,
      icon,
      menuPath,
      meta,
      name,
      path,
      redirect,
    };
    menuRouter.push(menuItem);
  }
  return menuRouter;
};

const hasPermissions = (permission: string) => {
  const permissionList: string[] = store.getters.permissions;
  return permissionList.includes(permission);
};

/**
 * 根据可以的工作台生成路由
 * @param menuGroup
 */
const getWorkPlaceRoute = (menuGroup: IepMenuGroupItem[]) => {
  const menuGroupRouter = menuGroup.map(m => {
    const path = m.path;
    const name = m.name;
    const _componentName = m.path === 'index' ? 'so' : m.path;
    const component = () => import(`@/views/wel/${_componentName}/index.vue`);
    return {
      path,
      name,
      component,
    };
  });
  return [
    {
      path: "/wel",
      component: Layout,
      redirect: "/wel/index",
      children: menuGroupRouter,
    },
  ];
};

export { transToMenu, transToRouter, hasPermissions, getWorkPlaceRoute };
