import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import App from './App'
import router from './router/router'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import store from './store/store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as echarts from 'echarts'
require('echarts-wordcloud')
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(mavonEditor)

Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
