import { i18nRender } from '@/locales'
const VueI18nPlugin = {
  install: function (Vue) {
    Vue.mixin({
      methods: {
        i18nRender
      }
    })
  }
}
export default VueI18nPlugin
