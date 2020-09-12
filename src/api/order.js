import { createAPI } from '@/utils/request'

// 条件分页查询
export const page = data => createAPI('/order/page', 'get', data)
