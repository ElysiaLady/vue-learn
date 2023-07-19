import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store'
import  './api/mock';
import Cookie from 'js-cookie';

Vue.config.productionTip = false
Vue.use(element)

router.beforeEach((to, from, next) =>{
  const token = Cookie.get('token')
  //token不存在，说明当前用户未登陆，应该跳转登陆页面
  if (!token && to.name !== 'login'){
    next({ name: 'login' })
  }
  //token存在，跳转至首页
  else if(token && to.name === 'login'){
    next({ name: 'home'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')
