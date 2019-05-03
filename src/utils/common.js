import Cookies from 'js-cookie'
import { cookieExpires } from '@/config' // cookie保存的天数

/**
 * @description: 存储 token
 */
export const TOKEN_KEY = 'token'
export const setToken = token => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires })
}
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) {
        return token
    } else {
        return false
    }
}

/**
 * @description: 截取字符串
 */
export const sliceStr = (str, sliceLen) => {
    if (!str) {
        return ''
    }
    let realLength = 0
    const len = str.length
    let charCode = -1
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1
        } else {
            realLength += 2
        }
        if (realLength > sliceLen) {
            return `${str.slice(0, i)}...`
        }
    }
    return str
}

/**
 * @description: JSON 克隆
 */
export function objClone(jsonObj) {
    let buf
    if (jsonObj instanceof Array) {
        buf = []
        let i = jsonObj.length
        while (i--) {
            buf[i] = objClone(jsonObj[i])
        }
        return buf
    } else if (jsonObj instanceof Object) {
        buf = {}
        for (let k in jsonObj) {
            buf[k] = objClone(jsonObj[k])
        }
        return buf
    } else {
        return jsonObj
    }
}

/**
 * @description: 校验手机号
 */
export const verifyPhone = phone => {
    const reg = /^1[34578][0-9]{9}$/
    const _phone = phone.toString().trim()
    let toastStr =
        _phone === ''
            ? '手机号不能为空~'
            : !reg.test(_phone) && '请输入正确手机号~'
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _phone
    }
}

/**
 * @description: 字符串非空校验
 */
export const verifyStr = (str, text) => {
    const _str = str.toString().trim()
    const toastStr = _str.length ? false : `请填写${text}～`
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _str
    }
}

/**
 * @description: 时间格式转换
 */
export const formatDate = (date, fmt) => {
    let time = ''
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        time = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            time = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return time
}

/**
 * @description: 获取当前系统时间
 */
export const getDate = fmt => {
    let time = ''
    const date = new Date()
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        time = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            time = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return time
}

/**
 * @description: 随机生成 len 位数字
 */
export const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, len || 4)
    if (date) random = random + Date.now()
    return random
}
