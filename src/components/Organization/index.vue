<template>
  <div>
    <el-tree lazy :data="treeData" node-key="id" :default-expanded-keys="expand" :props="defaultProps" :load="loadNode" 
      highlight-current
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      ref="tree"
    ></el-tree>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    // this.queryOrganization(0)
    /*
    this.queryOrganization(0)

    this.addOrganization({
      pid: 0,
      level: 1,
      name: '测试组织机构',
      code: '00000',
      id: 3
    })

    setTimeout(() => {
      // this.removeOrganization(1)
      // this.selectedOrganization(2)

      this.addOrganization({
        pid: 2,
        level: 1,
        name: '测33333试组织机构',
        code: '00000',
        id: 3333
      })
    }, 10000)
    */
  },
  computed: {
    ...mapGetters({
      treeData: 'organizationTreeList',
      item: 'organizationItem',
      list: 'organizationList',
      expand: 'organizationExpendList'
    })
  },
  methods: {
    ...mapActions(['queryOrganization', 'addOrganization', 'selectedOrganization', 'removeOrganization']),
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeData)
      } else {
        this.queryOrganization(node.data.id).then(() => {
          console.log(this.list, 'kjdjd')
          setTimeout(() => {
            return resolve(this.list)
          }, 200)
        })
      }
    },
    handleNodeClick(data) {
      console.log(data)
      this.$emit('node-click', data)
    },
    refresh(id) {
      this.selectedOrganization(id)
      this.removeOrganization(id)
      this.queryOrganization(this.item.pid)
      // this.$refs.tree.setCurrentKey(id)
    }
  },
  watch: {
    item(val) {
      console.log('####################3', val)
    }
  }
}
</script>
