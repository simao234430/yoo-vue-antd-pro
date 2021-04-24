<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      <span data-v-4c936209="" class="antd-pro-global-header-index-avatar ant-avatar ant-avatar-sm ant-avatar-circle ant-avatar-image">
        <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png">
      </span>
      Hover me
      </span></a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span><a href="/account/center" class="">个人中心</a></span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span><a href="/account/settings" class="">设置</a></span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
// import {logout} from '@/services/user'

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters('account', ['user'])
  },
  methods: {
    logout () {
      // logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
