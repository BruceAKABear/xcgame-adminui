// 应用api
import { createAPI } from '@/utils/request'
// 新增或修改
export const addOrUpdate = data => createAPI('/prePayResponse/addOrUpdate', 'post', data)
// 查询
export const getPrePayResponse = data => createAPI('/prePayResponse/getPrePayResponse', 'get', data)
