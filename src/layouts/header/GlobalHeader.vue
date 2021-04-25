<template>
  <div class="ant-pro-global-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleCollapse"
    />
    <div class="ant-pro-global-header-content">
      <a-breadcrumb class="trigger" >
        <a-breadcrumb-item v-for="item in breadCrumbList" :key="`bread-crumb-${item.name}`">
          <!-- {{$t( {{ item.meta.title }}) }} -->
          <!-- {{ item.meta.title }} -->
          {{ i18nRender( item.meta.title ) }}
        </a-breadcrumb-item >
      </a-breadcrumb>

    </div>
    <div class="ant-pro-global-header-index-right">
      <full-screen v-model="isFullscreen" />
      <header-notice class="ant-pro-global-header-index-action"/>
      <header-avatar class="ant-pro-global-header-index-action"/>

      <head-lang class="ant-pro-global-header-index-action" />
      </header-notice></div>
  </div>
</template>

<script>

import { i18nRender } from '@/locales'
import HeaderNotice from './HeaderNotice'
import HeaderAvatar from './HeaderAvatar'
import HeadLang from './HeadLang'
import FullScreen from '../fullscreen/FullScreen.vue'
  export default {
  components: { HeaderAvatar, HeaderNotice, HeadLang, FullScreen },
  computed: {
            breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },

  data () {
    return {
      isFullscreen: false,
      basePath: '/components/breadcrumb'
        // routes: [
        //   {
        //     path: 'index',
        //     breadcrumbName: 'home'
        //   },
        //   {
        //     path: 'first',
        //     breadcrumbName: 'first',
        //     children: [
        //       {
        //         path: '/general',
        //         breadcrumbName: 'General'
        //       },
        //       {
        //         path: '/layout',
        //         breadcrumbName: 'Layout'
        //       },
        //       {
        //         path: '/navigation',
        //         breadcrumbName: 'Navigation'
        //       }
        //     ]
        //   },
        //   {
        //     path: 'second',
        //     breadcrumbName: 'second'
        //   }
        // ]
    }
  },
    methods: {
      i18nRender,
    toggleCollapse () {
      console.log('toggleCollapse')
      this.$emit('toggleCollapse')
    }

  }
  }
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default";

@global-header-prefix-cls: ~'@{ant-prefix}-pro-global-header';

@pro-header-bg: @component-background;
@pro-header-hover-bg: @component-background;
@pro-header-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
@pro-header-hover-trigger-action-bg: rgba(0,0,0,.025);

.@{global-header-prefix-cls} {
    position: relative;
    height: @layout-header-height;
    padding: 0;
    background: @pro-header-bg;
    box-shadow: @pro-header-box-shadow;

    &-index-right {
        float: right;
        height: 100%;
        margin-left: auto;
        overflow: hidden;

        .@{global-header-prefix-cls}-index-action {
            display: inline-block;
            height: 100%;
            padding: 0 12px;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                background: @pro-header-hover-trigger-action-bg;
            }
        }
    }

    &-logo {
        display: inline-block;
        height: @layout-header-height;
        padding: 0 0 0 24px;
        font-size: 20px;
        line-height: @layout-header-height;
        vertical-align: top;
        cursor: pointer;
        img, svg {
            display: inline-block;
            width: 32px;
            height: 32px;
            vertical-align: middle;
        }
    }

    &-menu {
        .anticon {
            margin-right: 8px;
        }
        .ant-dropdown-menu-item {
            min-width: 160px;
        }
    }

    &-trigger {
        height: @layout-header-height;
        line-height: @layout-header-height;
        vertical-align: top;
        padding: 0 22px;
        display: inline-block;
        cursor: pointer;
        transition: all 0.3s, padding 0s;
        .anticon {
            font-size: 20px;
            vertical-align: -0.225em;
        }
        &:hover {
            background: @pro-header-hover-trigger-action-bg;
        }
    }

    &-content {
              height: @layout-header-height;
         vertical-align: top;
        padding: 0 0;
        display: inline-block;
    }

    .dark {
        height: @layout-header-height;
        .action {
            color: rgba(255, 255, 255, 0.85);
            > i {
                color: rgba(255, 255, 255, 0.85);
            }
            &:hover,
            &.opened {
                background: @primary-color;
            }
            .ant-badge {
                color: rgba(255, 255, 255, 0.85);
            }
        }
    }

    .ant-pro-global-header-index-action {
        i {
            color: rgba(0,0,0,.65);
            vertical-align: middle;
        }
    }

}

</style>