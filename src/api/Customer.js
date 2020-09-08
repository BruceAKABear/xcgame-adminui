// 应用api
import { createAPI } from '@/utils/request'
// 分页查询
export const page = data => createAPI('/customer/page', 'get', data)
