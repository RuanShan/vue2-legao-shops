const getters = {
  //登录用户状态
  shopId: state => state.user.shopId,
  shopName: state => state.user.shopName,
  name: state => state.user.name,
  cookie: state => state.user.cookie,
  roles: state => state.user.roles,
  loginData: state => state.user.loginData,
  userName: state => state.user.userName,
  userId: state => state.user.userId,

  //分页状态管理
  inventoryLimit: state => state.limit.inventory,
  orderLimit: state => state.limit.order,

  //会员管理
  memberQueryVisible: state => state.member.queryVisible,
  memberManageVisible: state => state.member.manageVisible,

  //动态路由
  addRouters: state => state.permission.addRouters,

  // 获取许可的路由规则
  permissionRouters: state => state.permission.routers, //左边路由
  homeRouters: state => state.permission.homeRouters //左边路由
};
export default getters;
