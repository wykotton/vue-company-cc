<template>
  <div class="app-container documentation-container">
    <a class="document-btn" target='_blank' href="http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/standardGeneral.md">{{$t('documentation.documentation')}}</a>
    <a class="document-btn" target='_blank' href="https://github.com/wykotton/vue-company-cc/">{{$t('documentation.github')}}</a>
    <dropdown-menu style="float:left;margin-left:50px;" title='系列文章' :items='articleList'></dropdown-menu>
  </div>
</template>
<script>
import DropdownMenu from '@/components/Share/dropdownMenu'

export default {
  name: 'documentation',
  components: { DropdownMenu },
  data() {
    return {
      articleList: [
        { title: '基础篇', href: '#' },
        { title: '权限篇', href: '#' }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.documentation-container {
  margin: 50px;
  .document-btn {
    float: left;
    margin-left: 50px;
    vertical-align: middle;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
