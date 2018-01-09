
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
        list[i].children = appendChild(list[i].id, list[i].children, pid, data, replace)
      } else {
        list[i].children = appendChild(list[i].id, [], pid, data, replace)
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
        list[i].children = removeChild(id, list[i].children)
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
      findObj(id, list.children)
    }
  }
}

const organization = {
  state: {
    treeList: [
      {
        pid: 0,
        level: 0,
        name: '测试测时',
        code: '0000',
        id: 1
      },
      {
        pid: 0,
        level: 0,
        name: '测试测时222',
        code: '0000',
        id: 2
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
    selectChildren: []
  },

  getters: {
    organizationTreeList: state => state.treeList,
    organizationItem: state => state.selectItem,
    organizationList: state => state.selectChildren
  },

  mutations: {
    APPEND_TREELIST(state, { pid, data, replace = false }) {
      console.log('APPEND_TREELIST')
      orgList = state.treeList
      const alist = appendChild(0, orgList, pid, data, replace)
      console.log('--', alist)
      state.treeList = alist
    },
    SET_CURRENT_CHILD(state, data) {
      state.selectChildren = [...data]
    },
    SET_CURRENT_ITEM(state, item) {
      state.selectItem = item
    },
    REMOVE_ITEM(state, id) {
      const list = removeChild(id, state.treeList)
      state.treeList = list
    }
  },

  actions: {
    queryOrganization({ commit, state }, pid) {
      setTimeout(() => {
        const data = [
          {
            pid: pid,
            level: 0,
            name: '测试测时' + pid,
            code: '0000',
            id: pid * 10 + 1
          },
          {
            pid: 0,
            level: 0,
            name: '测试测时222' + pid,
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
      }, 1000)
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
