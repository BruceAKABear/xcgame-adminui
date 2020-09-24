import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/TokenUtil'
import router from '@/router'

// create an axios instance
const instance = axios.create({
  // baseURL: 'http://192.168.1.5:8222',
  // baseURL: 'http://127.0.0.1:8222',
  baseURL: 'http://192.168.101.19:8222',
  timeout: 8000
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers.token = getToken()
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers.token = getToken()
    // }
    return config
  },
  error => {
    // Do something with request error
    Message.error('对不起，出错了')
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
instance.interceptors.response.use(
  response => {
    const realRes = response.data
    console.log('响应拦截器：', realRes)

    const status = realRes.status
    const message = realRes.message
    const code = realRes.code
    if (status) {
      return response.data
    } else {
      if (code === 11111) {
        // token失效需要重新登录
        router.push('/login')
      } else {
        Message({
          message: message,
          type: 'error',
          duration: 3 * 1000
        })
      }

      return Promise.reject(new Error('业务不能被执行'))
    }
    // // debugger
    // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    // if (errCode === 50008 || errCode === 50012 || errCode === 50014) {
    //   Message({
    //     message: '你已被登出，请重新登录',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   store.dispatch('FedLogOut').then(() => {
    //     location.reload() // 为了重新实例化vue-router对象 避免bug
    //   })
    //   return Promise.reject(new Error('token expired'))
    // } else if (errCode !== ok) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    // return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export const createAPI = (url, method, data) => {
  const config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  return instance({
    url,
    method,
    ...config
  })
}

export const createFormAPI = (url, method, data) => {
  const config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'json'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
export const createImgAPI = (url, method, data) => {
  const config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'blob'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
// 组织架构导出
export const createFileAPI = (url, method, data) => {
  const config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'arraybuffer'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
// 员工导出
export const createDown = (url, method, data) => {
  const config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'blob'
  return instance({
    url,
    method,
    ...config
  })
}
