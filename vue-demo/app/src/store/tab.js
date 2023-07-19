export default {
  state: {
    asideMenuIsCollapse: false, //控制左侧菜单的展开收起
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/home",
      },
    ], //面包屑数据
    menu: [],
  },
  mutations: {
    //修改菜单展开收起的方法
    collapseMenu(state) {
      state.asideMenuIsCollapse = !state.asideMenuIsCollapse;
    },
    //更新面包屑数据
    selectMenu(state, val) {
      //判断添加的数据是否是首页
      if (val.name !== "home") {
        const index = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        //如果不存在
        if (index === -1) {
          state.tabsList.push(val);
        }
      }
    },
    //重置面包屑
    resetMenu(state){
      state.tabsList = [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/home",
        },
      ]
    },
    //删除指定的tag数据
    closeTag(state, item){
      const index = state.tabsList.findIndex(val => val.name === item.name)
      state.tabsList.splice(index, 1)
    },
    setMenu(state, val){
      state.menu = val
      localStorage.setItem('menu', JSON.stringify(val))
    },
    //动态注册路由
    addMenu(state, router){
      //判断缓存中是否有数据
      if(!localStorage.getItem('menu')){
        return
      }
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu
      //组装动态路由的数据
      const menuArray = []
      menu.forEach(item => {
        if(item.children){
          item.children = item.children.map(item =>{
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        }else{
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }        
      });
      //路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })
    }
  },
};
