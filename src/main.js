import Vue from 'vue'
import store from './store/'
import router from './router'
import App from './App.vue'
import i18n from './locales'
import { VueAxios } from './utils/request'
import themePluginConfig from '../config/themePluginConfig'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import './global.less' // global style
// import 'ant-design-vue/dist/antd.less'
import './core/use' // use lazy load components
import './permission' // permission control
import './core/lazy_use' // use lazy load components
import bootstrap from './core/bootstrap'
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)

Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  store,
  router,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
