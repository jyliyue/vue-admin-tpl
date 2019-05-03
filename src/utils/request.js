import axios from 'axios'
import merge from 'lodash/merge'
import qs from 'qs'
import { MAINHOST } from '@/config'
import { getToken } from '@/utils/common'
import { Message } from 'element-ui'

const baseURL =
    process.env.NODE_ENV === 'production' ? MAINHOST : location.origin
const token = getToken()
const requestSuccessCode = 200

const http = axios.create({
    baseURL: baseURL,
    timeout: 1000 * 5,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

/**
 * @description: 请求拦截
 */
http.interceptors.request.use(
    config => {
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

/**
 * @description: 响应拦截
 */
http.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== requestSuccessCode) {
            Message({
                message: res.message || 'error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(res.message || 'error')
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        t: new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        t: new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
