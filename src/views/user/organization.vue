<template>
  <div class="app-container">
    <organization @node-click="handleNodeClick" ref="orgTree"></organization>

    <el-button @click="refresh">刷新</el-button>
  </div>
</template>

<script>
import Organization from '../../components/Organization'

export default {
  components: { Organization },
  methods: {
    handleNodeClick(data) {
      console.log('选中节点加载数据', data.id)
    },
    refresh() {
      this.$refs.orgTree.refresh(11)
    }
  }
}
</script>
