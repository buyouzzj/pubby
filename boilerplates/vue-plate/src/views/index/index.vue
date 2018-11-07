<!--
/**
 * @name: 首页(视图)
 * @description: 首页视图
 * @author: qiaozhi.xqz
 */
-->

<!--*********
    模板
**********-->
<template>
  <div>
    <header-layout></header-layout>
    <div class='hello'>
      <div class='container'>
        hello world!
      </div>
    </div>
    <footer-layout></footer-layout>
  </div>
</template>

<!--*********
    主逻辑
**********-->
<script lang='babel' type='text/ecmascript-6'>
  // 引用包
  import HeaderLayout from 'src/layouts/header-layout';
  import FooterLayout from 'src/layouts/footer-layout';

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
      HeaderLayout,
      FooterLayout,
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

  .hello {
    padding: 20px 0;
    background: $blue-base;
    color: #fff;
  }
</style>
