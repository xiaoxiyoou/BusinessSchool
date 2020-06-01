import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import 'assets/js/rem'
import 'assets/js/vant'
import 'assets/css/reset.css'
import VueCookies from 'vue-cookies'
import share from 'assets/js/share'

import LyTab from 'ly-tab'
Vue.use(LyTab)


Vue.config.productionTip = false
Vue.prototype.$axios = axios

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)


import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.prototype.$cookies = VueCookies

router.beforeEach((to, from, next) => {
  share('生命文化学院繁星学社', '生命文化学院繁星学社')
  // 设置title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.requireAuth) {
    let fromUrl = VueCookies.get('fromUrl', to.fullPath)
    localStorage.setItem('fromUrlTwo', decodeURIComponent(to.fullPath))
    if (!fromUrl) {
      VueCookies.set('fromUrl', to.fullPath)

    }
    if (localStorage.getItem('VideoUserId') && localStorage.getItem('openid') && VueCookies.get('VideoUserId')) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
    // share('生命文化学院繁星学社','生命文化学院繁星学社')
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')