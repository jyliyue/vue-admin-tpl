const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run com ${capPirName}')
    process.exit(0)
}

// vue 页面模板
const VueTep = `<template>
    <div class="${dirName}-wrap">
        ${dirName}
    </div>
</template>

<script>
// import {  } from '@/components'
export default {
    name: '${dirName}',
    components: {
        // ..
    },
    props: {
        data: {
            type: Array,
            default: () => []
        }
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

fs.mkdirSync(`${basePath}/components/${dirName}`) // mkdir
process.chdir(`${basePath}/components/${dirName}`) // cd views
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue
fs.writeFileSync(`${dirName}.scss`, scssTep) // scss

process.exit(0)
