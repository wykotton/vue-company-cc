# v-auth 指令，按钮权限

v-auth是基于Element UI的Button组件进行封装的支持权限控制的按钮组件。

**功能特性：**

- 支持所有el Button组件的api
- 支持权限控制

**使用方式：**

```
<el-button type="primary" @click="testButton" v-auth="{id:7, p:'sys:schedule:list'}">测试按钮</el-button>
```

**API：**
除v-auth外属性都会渲染至el的Button组件


参数 | 说明 | 类型 | 默认值
---|---|---|---
v-auth | 带有权限色彩 | Object | ''
id | 按钮ID | string | ''
p | 权限 | string | ''


默认v-auth为''，表示不验证权限。当v-auth有值时则验证当前用户是否拥有该权限，有则显示。
