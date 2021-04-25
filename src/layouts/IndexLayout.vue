<template>
  <a-layout
    v-bind="settings"
    :i18nRender="i18nRender"
    :collapsed="collapsed"
    id="components-layout-demo-custom-trigger"
    style="min-height: 100vh">
    <side-menu
      :title="title"
      :theme="settings.theme"
      @menuSelect="onMenuSelect"
      :collapsed="collapsed"
      :collapsible="false"
      :menuData="mainMenu"/>
    <a-layout>
      <a-layout-header style="  margin-bottom: 16px; background: #fff; padding: 0">
        <!-- <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div>
          right
        </div> -->
        <global-header :title="title" @toggleCollapse="toggleCollapse" />
      </a-layout-header>
      <!-- <admin-header></admin-header> -->
      <div
        :style="{ padding: '24px 24px 0px 24px', background: '#fff'}">
        <multi-tab />
      </div>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >

        <route-view/>
      </a-layout-content>

      <setting-drawer
        :i18nRender="i18nRender"
        :settings="settings"
        @change="handleSettingChange">
        <div style="margin: 12px 0;">
          This is SettingDrawer custom footer content.
        </div>
      </setting-drawer>
      </div></a-layout-content></a-layout>

  </a-layout>
</template>
<script>

import { CONTENT_WIDTH_TYPE, SET_HOME_ROUTE, SET_BREAD_CRUMB } from '@/store/mutation-types'
import defaultSettings from '@/config/defaultSettings'
import { mapState, mapMutations } from 'vuex'
import IMenu from './menu/menu'
import SideMenu from './menu/SideMenu'
import RouteView from './RouteView.vue'
import GlobalHeader from './header/GlobalHeader.vue'
import { i18nRender } from '@/locales'
import MultiTab from '../components/MultiTab/MultiTab.vue'
import { SettingDrawer } from '@ant-design-vue/pro-layout'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
// import routers from '@/router'
export default {
  components: { SideMenu, IMenu, RouteView, GlobalHeader, SettingDrawer, MultiTab },
  methods: {
    i18nRender,
        ...mapMutations([
      // 'setBreadCrumb',

      // 'setHomeRoute'

    ]),
        onMenuSelect () {
      // this.toggleCollapse()
    },
        toggleCollapse () {
          console.log('触发toggleCollapse')
      this.collapsed = !this.collapsed
    },
        setActivated (route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const { firstMenu } = this
        for (const menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    },
        handleSettingChange ({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          // if (value === 'sidemenu') {
          //   this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          // } else {
          //   this.settings.fixSiderbar = false
          //   this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          // }
          break
      }
    }
  },
    watch: {
    $route (val) {
      console.log('this.setActivated')
      this.setActivated(val)
                this.$store.commit(SET_HOME_ROUTE, [...constantRouterMap, ...asyncRouterMap])
                this.$store.commit(SET_BREAD_CRUMB, this.$route)
    },
    layout () {
      this.setActivated(this.$route)
    },
    isMobile (val) {
      if (!val) {
        this.drawerOpen = false
      }
    }
  },
    mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
          this.$store.commit(SET_HOME_ROUTE, [...constantRouterMap, ...asyncRouterMap])
                this.$store.commit(SET_BREAD_CRUMB, this.$route)

    // console.log('this.setHomeRoute')
    // this.setHomeRoute([...constantRouterMap, ...asyncRouterMap])
    //     console.log('this.setHomeRoute2')
},
    computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),

        menuItemList () {
      return [
        { key: '1', icon: 'vertical-right', text: this.$t('closeLeft') },
        { key: '2', icon: 'vertical-left', text: this.$t('closeRight') },
        { key: '3', icon: 'close', text: this.$t('closeOthers') },
        { key: '4', icon: 'sync', text: this.$t('refresh') }
      ]
    }
  },
  data () {
    return {

            clearCaches: [],
      pageList: [],
      activePage: '',
      menuVisible: false,
      refreshing: false,
      excludeKeys: [],
            title: defaultSettings.title,
            // 侧栏收起状态
      collapsed: false,
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
      }
//       menuData:
// [

//       // dashboard
//       {
//         path: '/dashboard',
//         name: 'dashboard',
//         redirect: '/dashboard/workplace',
//         meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
//         children: [
//           {
//             path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
//             name: 'Analysis',

//             meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
//           },
//           // 外部链接
//           {
//             path: 'https://www.baidu.com/',
//             name: 'Monitor',
//             meta: { title: 'menu.dashboard.monitor', target: '_blank' }
//           },
//           {
//             path: '/dashboard/testwork',
//             name: 'testwork',

//             meta: { title: 'menu.dashboard.testwork', keepAlive: true, permission: ['dashboard'] }
//           },
//           {
//             path: '/dashboard/workplace',
//             name: 'Workplace',

//             meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
//           }
//         ]
//       },
//        // forms
//       {
//         path: '/form',
//         redirect: '/form/base-form',
//         meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
//         children: [
//           {
//             path: '/form/base-form',
//             name: 'BaseForm',
//             meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
//           },
//           {
//             path: '/form/step-form',
//             name: 'StepForm',

//             meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] }
//           },
//           {
//             path: '/form/advanced-form',
//             name: 'AdvanceForm',

//             meta: { title: 'menu.form.advanced-form', keepAlive: true, permission: ['form'] }
//           }
//         ]
//       }
//       ]

  }
  }
}
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>