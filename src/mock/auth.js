// import Mock from 'mockjs'
import { param2Obj, mergeSort } from '@/utils'

// const List = []
// const count = 100

// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     id: '@increment',
//     timestamp: +Mock.Random.date('T'),
//     author: '@first',
//     reviewer: '@first',
//     title: '@title(5, 10)',
//     forecast: '@float(0, 100, 2, 2)',
//     importance: '@integer(1, 3)',
//     'type|1': ['CN', 'US', 'JP', 'EU'],
//     'status|1': ['published', 'draft', 'deleted'],
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }))
// }
const List = [{
  menu_id: 1,
  parent_id: 0,
  name: '系统管理',
  url: 'NULL',
  perms: 'NULL',
  type: 0,
  icon: 'fa fa-cog',
  order_num: 0
},
{
  menu_id: 2,
  parent_id: 1,
  name: '管理员列表',
  url: 'sys/user.html',
  perms: 'NULL',
  type: 1,
  icon: 'fa fa-user',
  order_num: 1
},
{
  menu_id: 3,
  parent_id: 1,
  name: '角色管理',
  url: 'sys/role.html',
  perms: 'NULL',
  type: 1,
  icon: 'fa fa-user-secret',
  order_num: 2
},
{
  menu_id: 4,
  parent_id: 1,
  name: '菜单管理',
  url: 'sys/menu.html',
  perms: 'NULL',
  type: 1,
  icon: 'fa fa-th-list',
  order_num: 3
},
{
  menu_id: 5,
  parent_id: 1,
  name: 'SQL监控',
  url: 'druid/sql.html',
  perms: 'NULL',
  type: 1,
  icon: 'fa fa-bug',
  order_num: 4
},
{
  menu_id: 6,
  parent_id: 1,
  name: '定时任务',
  url: 'sys/schedule.html',
  perms: '',
  type: 1,
  icon: 'fa fa-tasks',
  order_num: 5
},
{
  menu_id: 7,
  parent_id: 6,
  name: '查看',
  url: 'NULL',
  perms: 'sys:schedule:list,sys:schedule:info',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 8,
  parent_id: 6,
  name: '新增',
  url: 'NULL',
  perms: 'sys:schedule:save',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 9,
  parent_id: 6,
  name: '修改',
  url: 'NULL',
  perms: 'sys:schedule:update',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 10,
  parent_id: 6,
  name: '删除',
  url: 'NULL',
  perms: 'sys:schedule:delete',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 11,
  parent_id: 6,
  name: '暂停',
  url: 'NULL',
  perms: 'sys:schedule:pause',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 12,
  parent_id: 6,
  name: '恢复',
  url: 'NULL',
  perms: 'sys:schedule:resume',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 13,
  parent_id: 6,
  name: '立即执行',
  url: 'NULL',
  perms: 'sys:schedule:run',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 14,
  parent_id: 6,
  name: '日志列表',
  url: 'NULL',
  perms: 'sys:schedule:log',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 15,
  parent_id: 2,
  name: '查看',
  url: 'NULL',
  perms: 'sys:user:list,sys:user:info',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 16,
  parent_id: 2,
  name: '新增',
  url: 'NULL',
  perms: 'sys:user:save,sys:role:select',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 17,
  parent_id: 2,
  name: '修改',
  url: 'NULL',
  perms: 'sys:user:update,sys:role:select',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 18,
  parent_id: 2,
  name: '删除',
  url: 'NULL',
  perms: 'sys:user:delete',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 19,
  parent_id: 3,
  name: '查看',
  url: 'NULL',
  perms: 'sys:role:list,sys:role:info',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 20,
  parent_id: 3,
  name: '新增',
  url: 'NULL',
  perms: 'sys:role:save,sys:menu:perms',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 21,
  parent_id: 3,
  name: '修改',
  url: 'NULL',
  perms: 'sys:role:update,sys:menu:perms',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 22,
  parent_id: 3,
  name: '删除',
  url: 'NULL',
  perms: 'sys:role:delete',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 23,
  parent_id: 4,
  name: '查看',
  url: 'NULL',
  perms: 'sys:menu:list,sys:menu:info',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 24,
  parent_id: 4,
  name: '新增',
  url: 'NULL',
  perms: 'sys:menu:save,sys:menu:select',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 25,
  parent_id: 4,
  name: '修改',
  url: 'NULL',
  perms: 'sys:menu:update,sys:menu:select',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 26,
  parent_id: 4,
  name: '删除',
  url: 'NULL',
  perms: 'sys:menu:delete',
  type: 2,
  icon: 'NULL',
  order_num: 0
},
{
  menu_id: 27,
  parent_id: 1,
  name: '参数管理',
  url: 'sys/config.html',
  perms: 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete',
  type: 1,
  icon: 'fa fa-sun-o',
  order_num: 6
},
{
  menu_id: 28,
  parent_id: 1,
  name: '代码生成器',
  url: 'sys/generator.html',
  perms: 'sys:generator:list,sys:generator:code',
  type: 1,
  icon: 'fa fa-rocket',
  order_num: 8
},
{
  menu_id: 29,
  parent_id: 1,
  name: '系统日志',
  url: 'sys/log.html',
  perms: 'sys:log:list',
  type: 1,
  icon: 'fa fa-file-text-o',
  order_num: 7
},
{
  menu_id: 30,
  parent_id: 1,
  name: '文件上传',
  url: 'sys/oss.html',
  perms: 'sys:oss:all',
  type: 1,
  icon: 'fa fa-file-image-o',
  order_num: 6
}]

export default {
  getList: config => {
    const { page = 1, limit = 20, sort = 'order_num' } = param2Obj(config.url)

    let mockList = List

    if (sort) {
      mockList = mergeSort(mockList, sort)
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getAllList: config => {
    let mockList = List
    mockList = mergeSort(mockList, 'order_num')

    return mockList
  },
  getAuth: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
