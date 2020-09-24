// 应用api
import { createAPI } from '@/utils/request'
// 新增或修改
export const addOrUpdate = data => createAPI('/contentItem/addOrUpdate', 'post', data)
// 根据ID查询
export const findById = data => createAPI('/contentItem/findById', 'get', data)
// 分页查询
export const page = data => createAPI('/contentItem/page', 'get', data)
// 根据ID删除
export const deleteById = data => createAPI('/contentItem/deleteById', 'get', data)
// 查询游戏集合供下拉
export const queryList = data => createAPI('/contentItem/queryList', 'get', data)
