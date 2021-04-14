<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    :settings="settings"
  >
    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <template v-slot:menuHeaderRender>
      <div>
        <logo-svg />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义
    -->
    <template v-slot:headerContentRender>
      <div>
        <a-tooltip title="刷新页面">
          <a-icon type="reload" style="font-size: 18px;cursor: pointer;" @click="() => { $message.info('只是一个DEMO') }" />
        </a-tooltip>
      </div>
    </template>
    <setting-drawer :settings="settings" @change="handleSettingChange">
      <div style="margin: 12px 0;">
        This is SettingDrawer custom footer content.
      </div>
    </setting-drawer>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { mapState } from 'vuex'
import { SettingDrawer } from '@ant-design-vue/pro-layout'
import defaultSettings from '@/config/defaultSettings'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'
import LogoSvg from '../assets/logo.svg?inline'
import GlobalFooter from '@/components/GlobalFooter'
import RightContent from '@/components/GlobalHeader/RightContent'
import { i18nRender } from '@/locales'
  export default {
    name: 'BasicLayout',
    components: {
      SettingDrawer,
      RightContent,
      LogoSvg,
      GlobalFooter
    },
    data () {
      return {
        menus: [],
        // 侧栏收起状态
        collapsed: false,
        title: defaultSettings.title,
        settings: {
          // 布局类型
          layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
          // CONTENT_WIDTH_TYPE
          contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
          // 主题 'dark' | 'light'
          theme: defaultSettings.navTheme,
          // 主色调
          primaryColor: defaultSettings.primaryColor,
          fixedHeader: defaultSettings.fixedHeader,
          fixSiderbar: defaultSettings.fixSiderbar,
          colorWeak: defaultSettings.colorWeak,

          hideHintAlert: false,
          hideCopyButton: false
        },
        // 媒体查询
        query: {},

        // 是否手机模式
        isMobile: false
      }
    },
    computed: {
      ...mapState({
        // 动态主路由
        mainMenu: state => state.permission.addRouters
      })
    },
    created () {
      const routes = this.mainMenu.find(item => item.path === '/')
      this.menus = (routes && routes.children) || []
      // 处理侧栏收起状态
      this.$watch('collapsed', () => {
        this.$store.commit(SIDEBAR_TYPE, this.collapsed)
      })
      this.$watch('isMobile', () => {
        this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
      })
    },
    methods: {
      i18nRender,
      handleCollapse (val) {
        this.collapsed = val
      },
      handleSettingChange ({ type, value }) {
      },
      handleMediaQuery (val) {
      }
    }
  }
</script>

<style scoped>
@import "./BasicLayout.less";
</style>