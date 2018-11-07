<!--
/**
 * @name: 单页应用路由视图
 * @description: 路由视图
 * @author: qiaozhi.xqz
 */
-->

<!--*********
    模板
**********-->
<template>
  <div>
    <div class='navigation'>
      <a v-link="{ path: '/' }" :class="{'selected' : this.routePath == '' || this.routePath == '/index'}">首页</a>
      <a v-link="{ path: '/todo' }" :class="{'selected' : this.routePath == '/todo'}">Todo</a>
    </div>
    <router-view class='view' transition='fade' transition-mode='out-in' keep-alive></router-view>
  </div>
</template>

<!--*********
    主逻辑
**********-->
<script lang='babel' type='text/ecmascript-6'>
  // 声明getters
  const getters = {
    // state初始化与绑定
    routePath: (state) => state.route.path,
  };

  // 导出包
  export default {
    // vuex配置
    vuex: {
      getters,
    },
  };
</script>

<!--*********
    样式
**********-->
<style lang='scss' scoped>
  @import '../../assets/css/variables';

  .view {
    transition: all 0.2s ease;
  }

  .navigation {
    padding: 30px 0;
    margin: 0 auto;
    text-align: center;
    border-bottom: 1px solid #ccc;

    a {
      margin-left: 40px;

      &:first-child {
        margin-left: 0;
      }

      &.selected {
        color: $blue-base;
      }
    }
  }
</style>
