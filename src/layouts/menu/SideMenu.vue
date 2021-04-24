<template>
  <a-layout-sider

    :theme="sideTheme"
    :class="antd-pro-sider-menu"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <div class="ant-pro-sider-menu-logo">
      <router-link :theme="theme" to="/dashboard/workplace">
        <img :theme="theme" src="@/assets/logo.png">
        <h1>{{ title }} </h1>
      </router-link>
    </div>
    <i-menu :theme="theme" :collapsed="collapsed" :options="menuData" @select="onSelect" />
  </a-layout-sider>
</template>

<script>
import IMenu from './menu'
import { mapState } from 'vuex'
export default {
  name: 'SideMenu',
  components: { IMenu },
  props: {
    title: {
      type: String,
      required: false
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  computed: {
    sideTheme () {
      return this.theme === 'light' ? this.theme : 'dark'
    },
    ...mapState('setting', ['isMobile', 'systemName'])
  },
  methods: {
    onSelect (obj) {
      console.log(" this.$emit('menuSelect', obj)")
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style lang="less" scoped>
@import "index";
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
