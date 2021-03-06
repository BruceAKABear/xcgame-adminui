// 应用api
import { createAPI } from '@/utils/request'
// 新增或修改
export const addOrUpdate = data => createAPI('/appInfo/addOrUpdate', 'post', data)
// 根据ID查询
export const findById = data => createAPI('/appInfo/findById', 'get', data)
// 分页查询
export const page = data => createAPI('/appInfo/page', 'get', data)
// 根据ID删除
export const deleteById = data => createAPI('/appInfo/deleteById', 'get', data)
// 查询应用集合
export const queryAppList = data => createAPI('/appInfo/queryAppList', 'get', data)
