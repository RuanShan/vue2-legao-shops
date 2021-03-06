import { getCookie } from "@/utils/cookie"; // getCookie from cookie
import store from "@/store";

/**
 * 判断权限
 * @param {*} roles
 * @param {*} permissionRoles
 */
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf("admin") >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

/**
 * 配置路由全局守卫
 * @param {配置} router
 */
export default function(router) {
  router.beforeEach((to, from, next) => {
    //js-cookies
    if (getCookie()) {
      //有token
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        //判断当前用户是否已拉取完user_info信息
        //用户已经登录，所以不需要跳入登录页面，直接进管理页面
        if (store.getters.roles.length === 0) {
          store.dispatch("GET_USERINFO").then(response => {
            if (response) {
              store
                .dispatch("GENERAT_ROUTES", {
                  roles: store.getters.roles
                })
                .then(() => {
                  router.addRoutes(store.getters.addRouters);
                  next({ ...to, replace: true });
                });
            } else {
              //cookies失效
              next("/login");
            }
          });
        } else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断
          if (hasPermission(store.getters.roles, to.meta.roles)) {
            next();
          } else {
            next({
              path: "/401",
              replace: true,
              query: {
                noGoBack: true
              }
            });
          }
        }
      }
    } else {
      //如果目标是登录页面
      //跳过不处理
      if (~["/login", "/authredirect"].indexOf(to.path)) {
        next();
      } else {
        // 否则全部重定向到登录页
        next("/login");
      }
    }
  });
}
