// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import {routerMode,accessArr,appID,redirectUrl} from '@/config/env'
import routes from './router/index'
import  { ToastPlugin,ConfirmPlugin,AlertPlugin } from 'vux'
import {getStore,setStore,is_weixin} from '@/config/mUtils'
import {wxLoginApi} from '@/service/getData'
import VueScroller from 'vue-scroller'
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueRouter)
Vue.use(VueScroller)
Vue.use(AlertPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition ||0}
    }
  }
})

router.beforeEach((route, redirect, next)=>{
  if(is_weixin()){
    if(getStore('usercode')){
      next()
    }else if(route.query.code){
      wxLogin(route.query.code,next);
    }else {
      let tokenUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base`;
      location.href = tokenUrl;
    }
  }else if(accessArr.indexOf(route.name)===-1){
    if (!getStore('usercode')) {
      alert("请先登录")
      next({
        name: "login",
        query: { redirect: route.path }
      })
    } else {
      next()
    }
  }else{
    next()
  }
})

async function wxLogin(code,next){
  let res = await wxLoginApi(code);
  if(res.code != 0){
    alert("您的微信号未绑定商家，请前往绑定");
    let url = `http://baoyanghui.com/wx/bind/index.php?state=1`;
    let tokenUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${url}&response_type=code&scope=snsapi_base`;
    location.href = tokenUrl;
  }else{
    let name = "orderList"
    setStore('merchantId',res.resultData.merchantId)
    setStore('usercode',res.resultData.usercode)
    setStore('openid',res.resultData.openid)
    next({
      name: name
    })
  }
}




/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app-box')
