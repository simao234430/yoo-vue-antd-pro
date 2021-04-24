<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      <a-icon type="global" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;">1st menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">2nd menu item</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">3rd menu item</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .header-lang{
    display: inline-flex;
  }
</style>