import Vue from 'vue'
let orgList = []

const appendChild = (id, list, pid, data, replace) => {
  console.log(id, pid, replace, data, list)
  if (+pid === +id) {
    if (replace) {
      list = [...data]
    } else {
      list = [...list, ...data]
    }
    console.log(list)
  } else {
    console.log(list, list.length)
    for (let i = 0; i < list.length; i++) {
      if (list[i].children && list[i].children.length) {
        // list[i].children = appendChild(list[i].id, list[i].children, pid, data, replace)

        Vue.set(list[i], 'children', appendChild(list[i].id, list[i].children, pid, data, replace))
      } else {
        // list[i].children = appendChild(list[i].id, [], pid, data, replace)

        Vue.set(list[i], 'children', appendChild(list[i].id, [], pid, data, replace))
      }
    }
  }

  return list
}

const removeChild = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (+id === +list[i].id) {
      list.splice(i, 1)
    } else {
      if (list[i].children && list[i].children.length) {
        // list[i].children = removeChild(id, list[i].children)

        Vue.set(list[i], 'children', removeChild(id, list[i].children))
      }
    }
  }

  return list
}

const findObj = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (+list[i].id === +id) {
      return list[i]
    } else if (list[i].children && list[i].children.length > 0) {
      return findObj(id, list[i].children)
    }
  }
}

const organization = {
  state: {
    treeList: [
      {
        pid: -1,
        level: 0,
        name: '组织结构',
        code: '0000',
        id: 0
      }
    ],
    treeItem: {
      pid: '',
      level: 0,
      name: '',
      code: '',
      id: '',
      hasChild: true,
      children: []
    },
    selectItem: {},
    selectChildren: [],
    expendList: [0]
  },

  getters: {
    organizationTreeList: state => state.treeList,
    organizationItem: state => state.selectItem,
    organizationList: state => state.selectChildren,
    organizationExpendList: state => state.expendList
  },

  mutations: {
    APPEND_TREELIST(state, { pid, data, replace = false }) {
      console.log('APPEND_TREELIST')
      orgList = state.treeList
      const alist = appendChild(-1, orgList, pid, data, replace)
      console.log('--', alist)
      // state.treeList = alist
      // Vue.set(state, 'treeList', alist)
    },
    SET_CURRENT_CHILD(state, data) {
      state.selectChildren = [...data]
    },
    SET_CURRENT_ITEM(state, item) {
      state.selectItem = item
    },
    REMOVE_ITEM(state, id) {
      removeChild(id, state.treeList)
      // const list = removeChild(id, state.treeList)
      // Vue.set(state, 'treeList', list)
      // state.treeList = list
    },
    ADD_EXPEND(state, id) {
      if (state.expendList.indexOf(id) < 0) {
        state.expendList.push(id)
      }
    }
  },

  actions: {
    queryOrganization({ commit, state }, pid) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              pid: pid,
              level: 0,
              name: '测试测时' + pid + '-' + (pid * 10 + 1),
              code: '0000',
              id: pid * 10 + 1
            },
            {
              pid: 0,
              level: 0,
              name: '测试22测时' + pid + '-' + (pid * 10 + 2),
              code: '0000',
              id: pid * 10 + 2
            }
          ]
          commit('APPEND_TREELIST', {
            pid: pid,
            data: data,
            replace: true
          })
          commit('SET_CURRENT_CHILD', data)
          commit('ADD_EXPEND', pid)

          resolve()
        }, 1000)
      })
    },
    addOrganization({ commit, state }, org) {
      setTimeout(() => {
        commit('APPEND_TREELIST', { pid: org.pid, data: [org], replace: false })
      }, 1000)
    },
    selectedOrganization({ commit, state }, id) {
      commit('SET_CURRENT_ITEM', findObj(id, state.treeList))
    },
    removeOrganization({ commit }, id) {
      setTimeout(() => {
        commit('REMOVE_ITEM', id)
      }, 1000)
    }
  }
}

export default organization
