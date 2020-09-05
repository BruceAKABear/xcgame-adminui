// 应用api
import { createAPI } from '@/utils/request'
// 新增或修改
export const queryCount = data => createAPI('/dashBoard/queryCount', 'get', data)
