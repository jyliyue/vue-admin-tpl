import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { getToken } from '@/utils/common'

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})

// 登陆页面路由 name
const LOGIN_PAGE_NAME = 'login'
// 需登录访问页面 name
const ACCOUNT_PAGE_NAME = 'account'

// 跳转之前
router.beforeEach((to, from, next) => {
    const token = getToken()
    if (!token && to.name === ACCOUNT_PAGE_NAME) {
        // 未登录且要跳转的页面需要登录
        next({
            name: LOGIN_PAGE_NAME // 跳转到登录页
        })
    } else {
        next()
    }
})

// 跳转之后
router.afterEach(to => {
    //
    return to
})

export default router
