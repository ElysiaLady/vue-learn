export default{
    state:{
        asideMenuIsCollapse: false //控制左侧菜单的展开收起
    },
    mutations:{
        //修改菜单展开收起的方法
        collapseMenu(state){
            state.asideMenuIsCollapse = !state.asideMenuIsCollapse
        }
    }
}