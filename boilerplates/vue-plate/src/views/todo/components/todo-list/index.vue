<!--
/**
 * @name: Todo列表模块
 * @description: Todo列表模块
 * @author: qiaozhi.xqz
 */
-->

<!--*********
    模板
**********-->
<template>
  <div>
    <div class='todo-empty-tip' v-if="todoList.length === 0">暂无todo信息噢！</div>
    <ul class='todo-list' v-if="todoList.length > 0">
      <li @click.stop='selectElem(index)' v-for='(index, el) in todoList' :class="{ 'blur': currentSelect === index }">
        <div class='content'>
          <div class='word'>{{el.content}}</div>
          <div class='success' v-if='el.isDone' transition='fade'>已完成</div>
        </div>
        <div class='opt' v-if='currentSelect === index'>
          <div @click='checkTodo(el.id)' :class="{ 'btn': true, 'check-btn': true, 'checked': el.isDone }">{{el.isDone ? '标记未完成' : '标记完成'}}</div>
          <div @click='delTodo(el.id)' class='btn del-btn'>删除任务</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<!--*********
    主逻辑
**********-->
<script lang='babel' type='text/ecmascript-6'>
  // 引用包

  // 声明getters
  const getters = {
    // state初始化与绑定
    todoList: (state) => state.todo.todoList,
  };

  // 声明props
  const props = {
    currentSelect: { default: () => -1 },
  };

  // 声明actions
  const actions = {
    action_checkTodo({ dispatch }, id) {
      dispatch('CHECK_TODO', id);
    },
    action_delTodo({ dispatch }, id) {
      dispatch('DEL_TODO', id);
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
      this.listenBodyClick();
    },
    // 相关的方法
    methods: {
      listenBodyClick() {
        window.addEventListener('click', () => {
          this.currentSelect = -1;
        });
      },
      selectElem(index) {
        this.currentSelect = index;
      },
      checkTodo(id) {
        this.action_checkTodo(id);
      },
      delTodo(id) {
        this.action_delTodo(id);
      },
    },
  };
</script>

<!--*********
    样式
**********-->
<style lang='scss' scoped>
  @import 'src/assets/css/variables';

  .todo-empty-tip {
    padding: 40px 0;
    color: #666;
    text-align: center;
  }

  .todo-list {
    li {
      padding: 30px 20px;
      border: 1px solid #eee;
      border-top: none;
      transition: 0.2s all ease;
      cursor: pointer;
      position: relative;

      &:hover {
        background: #fafafa;
      }

      &.blur {
        background: #fafafa;

        .content {
          filter: blur(1px);
        }
      }

      .content {
        width: 100%;
        height: 100%;
        transition: 0.2s all ease;
      }
    }

    .opt {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .btn {
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 14px;
        float: left;
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .check-btn {
        background: $blue-base;
        color: #fff;

        &:hover {
          background: darken($blue-base, 10%);
        }

        &.checked {
          background: $gray-lighten-2;
        }
      }

      .del-btn {
        margin-left: 30px;
        background: #e74c3c;
        color: #fff;

        &:hover {
          background: darken(#e74c3c, 10%);
        }
      }
    }

    .success {
      padding: 6px 8px;
      border: 1px solid green;
      color: green;
      font-size: 14px;
      border-radius: 5px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
