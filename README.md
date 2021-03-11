# 1.vue多页面应用项目处于二级目录时，配置步骤
一般的项目，发布之后的访问目录时：http://localhost/admin/home
我们如果项目需要这样访问：http://localhost/app/admin/home, 那我们就需要配置二级目录app
## 1.1 配置vue.config.js
```js
module.exports = {
    publicPath: '/app/',
    outputDir: 'dist/app',
    pages: {
        'app/index': {
            entry: 'src/pages/index/main.js',
            filename: 'index.html',
            template: 'public/index.html',
            title: '首页page',
        },
        'app/admin': {
            entry: 'src/pages/admin/main.js',
            filename: 'admin/index.html',
            template: 'public/index.html',
            title: '管理页page',
        }
    },
}
```

## 1.2 配置路由
```js
//index 路由配置
export default new VueRouter({
    mode:'history',
    base:'/app/index/', //注意这里
    routes: routes
})
//admin 路由配置
export default new VueRouter({
    mode:'history',
    base:'/app/admin/',//注意这里
    routes: routes
})
```

## 1.3 配置nginx
```js
server {
    listen 9925;
    server_name localhost;
    root 'F:\ui_code\多页面应用有前缀\dist';
    location / app {
        index index.html;
        try_files $uri $uri/ /app/index.html;
    }
    location / app / admin {
        index index.html;
        try_files $uri $uri/ /app/admin/index.html;
    }
}
```

到此就可以正常使用了。

另外，我们在做项目，会用到全局配置，便于上线之后，随时可以更改，此时，我们会在public文件夹新建一个配置文件config.js，然后在index.html中引入，但是我们会遇到打包之后，此文件找不到或者报'>'错 

为了解决这个问题，我们把引入的路径写成绝对路径

比如 
<script src="/config"></script> 对应 http://localhost 的写法
<script src="/app/config"></script> 对应 http://localhost/app的写法
