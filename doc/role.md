[TOC]

## 前言

采用路由控制，不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成。先简单说一下，实现登录和权限验证的思路。

-  *登录*： 当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个token，拿到token之后（我会将这个token存贮到local.Storage中，保证刷新页面后能记住用户登录状态），前端会根据token再去拉取一个 用户信息 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

- *权限验证*： 通过token获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRoutes 动态挂载这些路由。

上述所有的数据和操作都是通过vuex全局管理控制的。(补充说明：刷新页面后 vuex的内容也会丢失，所以需要重复上述的那些操作)。

## 权限表结构

- id: 菜单或按钮id
- pid: 所属父级页面ID
- name: 菜单或按钮的名字，作为显示使用
- url: 菜单的跳转地址
- perms: 拥有的权限标识
- type: 类型 {0: 系统, 1: 菜单, 2: 按钮}
- icon: 图标 (菜单或按钮)
- order_num: 排序 (主要针对菜单)

## 菜单权限
先说一说我权限控制的主体思路，前端会有一份路由表，它表示了每一个路由可访问的权限。当用户登录之后，通过 token 获取用户的 role ，动态根据用户的 role 算出其对应有权限的路由，再通过router.addRoutes动态挂载路由。但这些控制都只是页面级的，说白了前端再怎么做权限控制都不是绝对安全的，后端的权限验证是逃不掉的。

前端来控制页面级的权限，不同权限的用户显示不同的侧边栏和限制其所能进入的页面(也做按钮级别的权限控制)，后端则会验证每一个涉及请求的操作，验证其是否有该操作的权限，每一个后台的请求不管是 get 还是 post 都会让前端在请求 header里面携带用户的 token，后端会根据该 token 来验证用户是否有权限执行该操作。若没有权限则抛出一个对应的状态码，前端检测到该状态码，做出相对应的操作。

### addRoutes
在之前通过后端动态返回前端路由一直很难做的，因为vue-router必须是要vue在实例化之前就挂载上去的，不太方便动态改变。不过好在vue2.2.0以后新增了router.addRoutes

> Dynamically add more routes to the router. The argument must be an Array using the same route config format with the routes constructor option.

有了这个我们就可相对方便的做权限控制了。(楼主之前在权限控制也走了不少歪路，可以在项目的commit记录中看到，重构了很多次，最早没用addRoute整个权限控制代码里都是各种if/else的逻辑判断，代码相当的耦合和复杂)

## 具体实现
1. 创建vue实例的时候将vue-router挂载，但这个时候vue-router挂载一些登录或者不用权限的公用的页面。
2. 当用户登录后，获取用role，将role和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表。
3. 调用router.addRoutes(store.getters.addRouters)添加用户可访问的路由。
4. 使用vuex管理路由表，根据vuex中可访问的路由渲染侧边栏组件。
### router.js
> 首先我们实现router.js路由表，这里就拿前端控制路由来举例(后端存储的也差不多，稍微改造一下就好了)

```
// router.js
import Vue from 'vue';
import Router from 'vue-router';

import Login from '../views/login/';
const dashboard = resolve => require(['../views/dashboard/index'], resolve);
//使用了vue-routerd的[Lazy Loading Routes
](https://router.vuejs.org/en/advanced/lazy-loading.html)

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{ path: 'dashboard', component: dashboard }]
  },
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin','super_editor'] }, //页面需要的权限
    children: [
    {
      path: 'index',
      component: Permission,
      name: '权限测试页',
      meta: { role: ['admin','super_editor'] }  //页面需要的权限
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
];

```

这里我们根据 [vue-router官方推荐](https://router.vuejs.org/en/advanced/meta.html) 的方法通过meta标签来标示改页面能访问的权限有哪些。如`meta: { role: ['admin','super_editor'] }`表示该页面只有admin和超级编辑才能有资格进入。

注意事项：这里有一个需要非常注意的地方就是 `404` 页面一定要最后加载，如果放在`constantRouterMap`一同声明了`404`，后面的所以页面都会被拦截到`404`，详细的问题见[addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)

### main.js
```
// main.js
router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取info
          const roles = res.data.role;
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});

```
我是把所有的路由都挂在了上去，所有我要各种判断当前的用户是否有权限进入该页面，各种if/else的嵌套，维护起来相当的困难。但现在有了addRoutes之后就非常的方便，我只挂载了用户有权限进入的页面，没权限，路由自动帮我跳转的404,省去了不少的判断。

这里还有一个小hack的地方，就是router.addRoutes之后的next()可能会失效，因为可能next()的时候路由并没有完全add完成，好在查阅文档发现

> next('/') or next({ path: '/' }): redirect to a different location. The current navigation will be aborted and a new one will be started.

这样我们就可以简单的通过next(to)巧妙的避开之前的那个问题了。这行代码重新进入router.beforeEach这个钩子，这时候再通过next()来释放钩子，就能确保所有的路由都已经挂在完成了。

### store/permission.js
就来就讲一讲 GenerateRoutes Action

```
// store/permission.js
import { asyncRouterMap, constantRouterMap } from 'src/router';

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

export default permission;

```

这里通过用户的权限和之前在router.js里面asyncRouterMap的每一个页面所需要的权限做匹配，最后返回一个该用户能够访问路由有哪些。

## 侧边栏
最后一个涉及到权限的地方就是侧边栏，不过在前面的基础上已经很方便就能实现动态显示侧边栏了。这里侧边栏基于element-ui的NavMenu来实现的。

就是遍历之前算出来的permission_routers，通过vuex拿到之后动态v-for渲染而已。不过这里因为有一些业务需求所以加了很多判断
比如我们在定义路由的时候会加很多参数

```
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
   role: ['admin','editor']     will control the page role (you can set multiple roles)
   title: 'title'               the name show in submenu and breadcrumb (recommend set)
   icon: 'svg-name'             the icon show in the sidebar,
   noCache: true                if fasle ,the page will no be cached(default is false)
 }
**/
```

这里仅供参考，而且本项目为了支持无限嵌套路由，所有侧边栏这块使用了递归组件。如需要请大家自行改造，来打造满足自己业务需求的侧边栏。

侧边栏高亮问题:很多人在群里问为什么自己的侧边栏不能跟着自己的路由高亮，其实很简单，element-ui官方已经给了default-active所以我们只要

> :default-active="$route.path"
将default-active一直指向当前路由就可以了，就是这么简单


## axios拦截器
这里不在多说 axios 。之前已经介绍过了。服务端对每一个请求都会验证权限，所以这里我们针对业务封装了一下请求。首先我们通过request拦截器在每个请求头里面塞入token，好让后端对请求进行权限验证。并创建一个respone拦截器，当服务端返回特殊的状态码，我们统一做处理，如没权限或者token失效等操作。
```
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service

```

