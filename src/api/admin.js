import { createAPI } from '@/utils/request'

// 登录
export const login = data => createAPI('/sysUser/login', 'post', data)
