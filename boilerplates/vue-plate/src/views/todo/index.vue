<!--
/**
 * @name: Todo示例
 * @description: Todo视图
 * @author: qiaozhi.xqz
 */
-->

<!--*********
    模板
**********-->
<template>
  <div class='todo-wrap'>
    <todo-add></todo-add>
    <todo-list></todo-list>
  </div>
</template>

<!--*********
    主逻辑
**********-->
<script lang='babel' type='text/ecmascript-6'>
  // 引用包
  import TodoAdd from './components/todo-add';
  import TodoList from './components/todo-list';

  // 声明getters
  const getters = {
  };

  // 声明props
  const props = {
  };

  // 声明actions
  const actions = {
  };

  // 导出包
  export default {
    // 声明静态属性
    props,
    // vuex配置
    vuex: {
      actions, // 注册action
      getters, // 获取初始state
    },
    // 声明组件
    components: {
      TodoAdd,
      TodoList,
    },
    // 生成后回调
    ready() {
    },
    // 相关的方法
    methods: {
    },
  };
</script>

<!--*********
    样式
**********-->
<style lang='scss' scoped>
  .todo-wrap {
    padding-top: 40px;
    margin: 0 auto;
    width: 800px;
  }
</style>
