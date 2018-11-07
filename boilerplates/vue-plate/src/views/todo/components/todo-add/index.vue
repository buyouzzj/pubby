<!--
/**
 * @name: Todo添加模块
 * @description: Todo添加模块
 * @author: qiaozhi.xqz
 */
-->

<!--*********
    模板
**********-->
<template>
  <div class='todo-title'>
    <span>用户名：{{username}}</span>
    <span>滚动高度：{{scrollTop}}</span>
  </div>
  <div class='todo-add'>
    <input class='add-input' placeholder='输入todo内容' v-model="newTodoVal"/>
    <div class='add-btn' @click='addTodo'>添加</div>
  </div>
</template>

<!--*********
    主逻辑
**********-->
<script lang='babel' type='text/ecmascript-6'>
  // 引用包

  // 声明getters
  import { scrollTop } from 'src/vuex/getters';
  const getters = {
    // state初始化与绑定
    scrollTop,
    username: (state) => state.user.username,
    todoList: (state) => state.todo.todoList,
  };

  // 声明props
  const props = {
    newTodoVal: { default: () => '' },
  };

  // 声明actions
  const actions = {
    action_addTodo({ dispatch }, value) {
      dispatch('ADD_TODO', value);
    },
    action_changeScrollTop({ dispatch }, scrollData) {
      const newScrollTop = scrollData || document.body.scrollTop || document.documentElement.scrollTop;
      dispatch('SCROLLTOP', newScrollTop);
    },
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
    },
    // 生成后回调
    ready() {
      this.scrollListener();
    },
    // 相关的方法
    methods: {
      scrollListener() {
        window.addEventListener('scroll', () => {
          this.action_changeScrollTop();
        });
      },
      addTodo() {
        const v = this.newTodoVal;
        if (v) {
          // 检查重复
          let found = false;
          this.todoList.forEach((el) => {
            if (el.content === v) {
              found = true;
            }
          });
          if (!found) {
            this.action_addTodo(this.newTodoVal);
            this.newTodoVal = '';
          }
        }
      },
    },
  };
</script>

<!--*********
    样式
**********-->
<style lang='scss' scoped>
  @import 'src/assets/css/mixins';
  @import 'src/assets/css/variables';

  .todo-title {
    margin-bottom: 40px;
    text-align: center;

    span {
      &:last-child {
        margin-left: 30px;
      }
    }
  }

  .todo-add {
    padding: 20px;
    background: #eee;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
  }

  .add-input {
    @include input-size('md');

    width: 650px;
    float: left;
  }

  .add-btn {
    margin-left: 20px;
    width: 90px;
    height: 32px;
    line-height: 32px;
    float: left;
    text-align: center;
    font-size: 14px;
    background: $blue-base;
    color: #fff;
    border-radius: 5px;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background: darken($blue-base, 10%);
    }
  }
</style>
