# vue-company-cc
企业管理中台

## 1. Start
> 以现有的[vue-frontend-scaffold](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold.git)为基础(目前托管到公司GIT服务器)。具体说明可参看[项目说明文档](introduce.md)

## 2. $http service
> 使用[axios](https://github.com/axios/axios)库来请求动态服务数据。vue更新到2.0之后,作者就宣告不再对`vue-resource`更新,而是推荐的`axios`。

### 2.1. Request Config
我们在文件` /src/api/io.js `中封装了一个请求配置拦截器，我们约定在里面书写请求配置，如:
```
const io = axios.create({withCredentials: true}) // 允许跨域请求
io.interceptors.request.use((config) => {
  if (token) config.headers['X-token'] = token
  return config
}, (error) => {
  return Promise.reject(error)
})
...
```
更多配置信息请移步至 [axios说明文档](https://github.com/axios/axios/blob/master/README.md)

## 3. UI Library
| 终端 | UI | version |
| :--- | :--- | :--- |
| PC | [element-ui](http://element.eleme.io/#/zh-CN)  | "^2.0.5" |
| MOBILE | [weex-ui](https://alibaba.github.io/weex-ui/#/) | "^0.3.8" |

## 4. External plug-ins
> 参看 [依赖包配置文件](/package.json) [ 里面包含了所有外部插件，以及其版本号 ]

## 5. Component Library

### 5.1 PC端
> 基于element-ui基础组件的基础上，构建的一套适用于公司具体业务场景的组件库

- [安装DEMO](begin.md)
- [组件介绍](components.md)
    - [Page](page.md)
    - [DataGrid](DataGrid.md)
    - [Dialog](dialog.md)
    - [Upload](upload.md)
    - [FileUpload](fileUpload.md)
    - [ImagePreview](imagePreview.md)

## 6. 规范

### 6.1 PC端 规范

> 参看 [Web前端开发规范文档](WebFE_dev_sta_doc.md)

### 6.2 移动端 HTML head 头标签

> PC端请参看 6.1 中的 html书写规范

```
<!DOCTYPE html> <!-- 使用 HTML5 doctype，不区分大小写 -->
<html lang="zh-cmn-Hans"> <!-- 更加标准的 lang 属性写法 http://zhi.hu/XyIa -->
<head>
    <!-- 声明文档使用的字符编码 -->
    <meta charset='utf-8'>
    <!-- 优先使用 IE 最新版本和 Chrome -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <!-- 页面描述 -->
    <meta name="description" content="不超过150个字符"/>
    <!-- 页面关键词 -->
    <meta name="keywords" content=""/>
    <!-- 网页作者 -->
    <meta name="author" content="flaginfo"/>
    <!-- 搜索引擎抓取 -->
    <meta name="robots" content="index,follow"/>
    <!-- 为移动设备添加 viewport -->
    <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">

    <!-- iOS 设备 begin -->
    <meta name="apple-mobile-web-app-title" content="标题">
    <!-- 添加到主屏后的标题（iOS 6 新增） -->
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->

    <meta name="format-detection" content="telphone=no, email=no"/>
    <!-- 忽略页面中的数字识别为电话，忽略email识别 -->
    <!-- 启用360浏览器的极速模式(webkit) -->
    <meta name="renderer" content="webkit">
    <!-- 避免IE使用兼容模式 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>
    <!-- 添加 favicon icon -->

    <title>标题</title>
</head>
```

### 6.1 VUE编码 规范

> 参看 [VUE编码规范](VUE_dev_sta_doc.md)


**权限方案：**

对权限部分进行了重新设计，支持更细粒度的权限控制（按钮级）。前端的权限应该控制什么？**资源的可见性**。其包括：
- 路由的可见性。
- 页面中按钮的可见性。

在登录时获取用户拥有的权限集合，在前端存储。
- 路由可见性控制：路由变化时，进行权限判断，通过则渲染对应组件，否则渲染403组件。
- 按钮的可见性控制：封装el-button组件，传入按钮所需权限名，内部进行权限判断，通过则渲染按钮。

前端的权限控制只能处理页面渲染，不能保证系统的绝对安全，服务端也需要对接口的权限进行验证。


**组件：**

bird-front对常用的数据组件进行了封装，使其简单易用，包括：
- [组件介绍](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/components.md)
    - 分页[Page](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/page.md)
    - 表格[DataGrid](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/DataGrid.md)
    - 模态窗[Dialog](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/dialog.md)
    - 上传[Upload](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/upload.md)
    - 文件上传[FileUpload](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/fileUpload.md)
    - 图片预览[ImagePreview](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/imagePreview.md)
    - 权限按钮[v-auth](http://gitlab.flaginfo.com.cn/application-business/vue-frontend-scaffold/blob/master/doc/imagePreview.md)


所有业务组件的理念均是结合服务端接口进行组件的封装，兼顾灵活性的同时保证更优的业务开发速度。


**安装依赖包：**

```
npm install
```

**启动项目：**

```
npm run dev
```




