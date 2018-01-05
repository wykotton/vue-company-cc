<template>
  <div class="app-container">

    <div class="block">
      <el-button type="primary" @click="testButton" v-auth="{id:7, p:'sys:schedule:list'}">Primary</el-button>
      <el-button type="success" @click="testButton" v-auth="{id:8, p:'sys:schedule:save'}">Success</el-button>
      <el-button type="info" @click="testButton" v-auth="{id:9, p:'sys:schedule:update'}">Info</el-button>
      <el-button type="warning" @click="testButton" v-auth="{id:10, p:'sys:schedule:delete'}">Warning</el-button>
      <el-button type="danger" @click="testButton" v-auth="{id:11, p:'sys:schedule:pause'}">Danger</el-button>
    </div>

    <div class="block">
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
      <el-button type="primary" icon="el-icon-search">Search</el-button>
      <el-button type="primary">
        Upload
        <i class="el-icon-upload el-icon-right"></i>
      </el-button>
    </div>

  </div>
</template>

<script>
import auth from '@/directive/auth.js'
import '@/assets/custom-theme/index.css' // the theme changed version element-ui css

export default {
  name: 'theme',
  data() {
    return {
      theme: false
    }
  },
  directives: {
    auth
  },
  methods: {
    testButton() {
      alert('有权限')
    }
  }
}
</script>

<style scoped>
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  margin: 20px auto;
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}
</style>
