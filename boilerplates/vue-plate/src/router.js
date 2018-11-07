/**
 * @name: 单页应用路由配置
 * @description: 默认不被引用，单页应用请引用该文件
 * @author: qiaozhi.xqz
 */

// 引用视图
import Index from './views/index';
import Todo from './views/todo';

export function configRouter(router) {
  // 常规路由
  router.map({
    '/index': {
      component: Index,
    },
    '/todo': {
      component: Todo,
    },
    // 未找到路由时的默认组件
    // '*': {
    //   component: NotFound,
    // },
  });

  // 重定向
  router.redirect({
    '/': '/index',
  });

  // before钩子
  router.beforeEach((transition) => {
    transition.next();
  });
}

/**
 * 完整example:
 */
// export function configRouter (router) {
//   // normal routes
//   router.map({
//     // basic example
//     '/about': {
//       // the component can also be a plain string component id,
//       // but a component with that id must be available in the
//       // App component's scope.
//       component: require('./components/about.vue')
//     },
//     // nested example
//     '/user/:userId': {
//       component: require('./components/user/index.vue'),
//       subRoutes: {
//         // matches "/user/:userId/profile/:something"
//         'profile/:something': {
//           component: require('./components/user/profile.vue')
//         },
//         // matches "/user/:userId/posts"
//         'posts': {
//           component: require('./components/user/posts.vue')
//         },
//         // matches "/user/:userId/settings"
//         'settings': {
//           component: require('./components/user/settings.vue')
//         }
//       }
//     },
//     // not found handler
//     '*': {
//       component: require('./components/not-found.vue')
//     },
//     // advanced example
//     '/inbox': {
//       component: require('./components/inbox/index.vue'),
//       subRoutes: {
//         '/message/:messageId': {
//           component: require('./components/inbox/message.vue')
//         },
//         '/archived': {
//           component: require('./components/inbox/archive.vue')
//         },
//         // default component to render into the nested outlet
//         // when the parent route is matched but there's no
//         // nested segment. In this case, "/inbox".
//         '/': {
//           // inline component
//           component: {
//             template: 'default yo'
//           }
//         }
//       }
//     }
//   })
//   // redirect
//   router.redirect({
//     '/info': '/about',
//     '/hello/:userId': '/user/:userId'
//   })
//   // global before
//   // 3 options:
//   // 1. return a boolean
//   // 2. return a Promise that resolves to a boolean
//   // 3. call transition.next() or transition.abort()
//   router.beforeEach((transition) => {
//     if (transition.to.path === '/forbidden') {
//       router.app.authenticating = true
//       setTimeout(() => {
//         router.app.authenticating = false
//         alert('this route is forbidden by a global before hook')
//         transition.abort()
//       }, 3000)
//     } else {
//       transition.next()
//     }
//   })
// }
