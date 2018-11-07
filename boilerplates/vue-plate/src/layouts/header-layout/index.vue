<!--
/**
 * @name: 公共头部
 * @description: 公共头部
 * @author: qiaozhi.xqz
 */
-->

<!--*********
    模板
**********-->
<template>
  <header>
    <div class='container clearFix'>
      <span>头部header</span>
    </div>
  </header>
</template>

<!--*********
    主逻辑
**********-->
<script lang='babel' type='text/ecmascript-6'>
  // 引用包

  // 声明getters
  const getters = {
    // state初始化与绑定
  };

  // 声明props
  const props = {
  };

  // 声明actions
  const actions = {
  };

  // 导出包
  export default {
    // 声明传入属性
    props,
    // vuex配置
    vuex: {
      actions, // 注册action
      getters, // 获取初始state
    },
    // 声明使用的组件
    components: {
    },
    // 组件加载完毕后回调
    ready() {
    },
    // 组件的方法
    methods: {
    },
  };
</script>

<!--*********
    样式
**********-->
<style lang='scss' scoped>
  @import '../../assets/css/variables';

  header {
    background: $background-base;
    padding: 20px 0;
  }
</style>
