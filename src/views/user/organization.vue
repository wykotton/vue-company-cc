<template>
  <div class="app-container">
    <div v-for="tree in treeData" :key="tree.id">
      {{tree.id}} - {{tree.name}}
    </div>
    <div>--------------------</div>
    <div>{{item.id}} - {{item.name}}</div>
    <div>--------------------</div>
    <div v-for="item in list" :key="item.id">
      {{item.id}} - {{item.name}}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  mounted() {
    this.selectedOrganization(1)
    this.queryOrganization(1)

    this.addOrganization({
      pid: 0,
      level: 1,
      name: '测试组织机构',
      code: '00000',
      id: 3
    })

    setTimeout(() => {
      this.removeOrganization(1)
    }, 3000)
  },
  computed: {
    ...mapGetters({
      treeData: 'organizationTreeList',
      item: 'organizationItem',
      list: 'organizationList'
    })
  },
  methods: {
    ...mapActions(['queryOrganization', 'addOrganization', 'selectedOrganization', 'removeOrganization'])
  }
}
</script>
