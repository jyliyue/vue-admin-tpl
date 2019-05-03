const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run page ${capPirName}')
    process.exit(0)
}

// vue 页面模板
const VueTep = `<template>
    <div class="${dirName}-wrap">
        ${dirName}
    </div>
</template>

<script>
// import * from '@/api/${dirName}Api'
// import {  } from '@/components'
export default {
    name: '${dirName}',
    components: {
        // ..
    },
    data() {
        return {
            // ..
        }
    },
    created() {
        // ..
    },
    mounted() {
        // ..
    },
    methods: {
        // ..
    }
}
</script>

<style lang="scss">
@import './${dirName}.scss';
</style>
`
// scss 模版
const scssTep = `@import "@/assets/scss/variables.scss";

.${dirName}-wrap {
    width: 100%;
}
`
// api 模板
const apiTep = `import http from '@/utils/request'
// export function GET(params) {
//     return http({
//         url: '***',
//         method: 'get',
//         params: http.adornParams(params)
//     })
// }

// export function POST(data) {
//     return http({
//         url: '***',
//         method: 'post',
//         params: http.adornData(data)
//     })
// }
`

fs.mkdirSync(`${basePath}/views/${dirName}`) // mkdir
process.chdir(`${basePath}/views/${dirName}`) // cd views
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue
fs.writeFileSync(`${dirName}.scss`, scssTep) // scss

process.chdir(`${basePath}/api`) // cd views
fs.writeFileSync(`${dirName}Api.js`, apiTep) // api

process.exit(0)
