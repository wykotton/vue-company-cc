# vue-company-cc
企业管理中台

**权限方案：**

对权限部分进行了重新设计，支持更细粒度的权限控制（按钮级）。前端的权限应该控制什么？**资源的可见性**。其包括：
- 路由的可见性。
- 页面中按钮的可见性。

在登录时获取用户拥有的权限集合，在前端存储。
- 路由可见性控制：路由变化时，进行权限判断，通过则渲染对应组件，否则渲染403组件。
- 按钮的可见性控制：封装el-button组件，传入按钮所需权限名，内部进行权限判断，通过则渲染按钮。

前端的权限控制只能处理页面渲染，不能保证系统的绝对安全，服务端也需要对接口的权限进行验证。


**组件：**

对常用的数据组件进行了封装，使其简单易用，包括：
- [组件介绍](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/components.md)
    - 分页[Page](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/page.md)
    - 表格[DataGrid](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/DataGrid.md)
    - 模态窗[Dialog](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/dialog.md)
    - 上传[Upload](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/upload.md)
    - 文件上传[FileUpload](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/fileUpload.md)
    - 图片预览[ImagePreview](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/imagePreview.md)
    - 菜单权限[v-auth](https://github.com/wykotton/vue-company-cc/blob/master/doc/role.md)
    - 权限按钮[v-auth](https://github.com/wykotton/vue-company-cc/blob/master/doc/auth.md)


所有业务组件的理念均是结合服务端接口进行组件的封装，兼顾灵活性的同时保证更优的业务开发速度。


**安装依赖包：**

```
npm install
```

**启动项目：**

```
npm run dev
```




