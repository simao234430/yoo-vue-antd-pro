import Vue from 'vue'
import store from './store/'
import router from './router'
import App from './App.vue'
import i18n from './locales'
import './global.less' // global style
// import 'ant-design-vue/dist/antd.less'
import './core/use' // use lazy load components
import './core/lazy_use' // use lazy load components
Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
