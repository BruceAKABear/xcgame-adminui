import { createAPI } from '@/utils/request'

// 条件分页查询
export const page = data => createAPI('/userMessage/page', 'get', data)
// 回复用户
export const reply = data => createAPI('/userMessage/reply', 'post', data)
