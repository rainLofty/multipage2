let path = require('path');
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
    chainWebpack: (config) => {
        config.resolve.alias
            .set("@css", path.join(__dirname, "./src/assets/css"))
    },
}