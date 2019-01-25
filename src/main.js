// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router' // 引入路由
import axios from 'axios' // 引入axios
import echarts from 'echarts'// 引入echarts
import ElementUI from 'element-ui' // 引入element ui
import promise from 'es6-promise' // Axios不能直接兼容IE9 下载好es6-promise引入
import '../static/css/reset.css' // 引入公共样式
import 'element-ui/lib/theme-chalk/index.css'// 引入element ui的样式
import '../static/css/common.css'// 引入自己写的公共样式
import 'babel-polyfill'// 代码填充解决IE兼容
Vue.use(ElementUI) // 引入element ui
Vue.config.productionTip = false
Vue.use(Router) // 引入路由
Vue.prototype.$ajax = axios // 原型引入axios：注意axios不是插件，不能直接用Vue.use(axios)
Vue.prototype.$echarts = echarts// 引入echarts
promise.polyfill()// Axios不能直接兼容IE9 下载好es6-promise引入

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
