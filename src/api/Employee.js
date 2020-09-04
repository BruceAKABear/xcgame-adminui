// 应用api
import { createAPI } from '@/utils/request'
// 新增或修改
export const addOrUpdate = data => createAPI('/sysUser/addOrUpdate', 'post', data)
// 根据ID查询
export const findById = data => createAPI('/sysUser/findById', 'get', data)
// 分页查询
export const page = data => createAPI('/sysUser/page', 'get', data)
// 根据ID删除
export const deleteById = data => createAPI('/sysUser/deleteById', 'get', data)
// 查询游戏集合供下拉
export const queryGameList = data => createAPI('/sysUser/queryGameList', 'get', data)
