// 应用api
import { createAPI } from '@/utils/request'
// 支付新增或修改
export const addOrUpdatePay = data => createAPI('/prePayResponse/addOrUpdate', 'post', data)
// 支付查询
export const getPrePayResponse = data => createAPI('/prePayResponse/getPrePayResponse', 'get', data)
// 关注新增或修改
export const addOrUpdateFollow = data => createAPI('/followResponse/addOrUpdate', 'post', data)
// 关注查询
export const getFollowResponse = data => createAPI('/followResponse/getFollowResponse', 'get', data)
