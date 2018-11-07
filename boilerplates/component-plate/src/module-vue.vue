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
    <div class='hello'>
      <div class='container'>
        hello world!!!!!!!
      </div>
    </div>
  </div>
</template>

<!--*********
    主逻辑
**********-->
<script lang='babel' type='text/ecmascript-6'>
  // 引用包

  // 声明props
  const props = {
  };

  // 导出包
  export default {
    // 声明传入属性
    props,
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
  .container {
    background: #e7e7e7;
    padding: 20px 0;
  }
</style>
