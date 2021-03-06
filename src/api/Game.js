// 应用api
import { createAPI } from '@/utils/request'
// 新增或修改
export const addOrUpdate = data => createAPI('/game/addOrUpdate', 'post', data)
// 根据ID查询
export const findById = data => createAPI('/game/findById', 'get', data)
// 分页查询
export const page = data => createAPI('/game/page', 'get', data)
// 根据ID删除
export const deleteById = data => createAPI('/game/deleteById', 'get', data)
// 查询游戏集合供下拉
export const queryGameList = data => createAPI('/game/queryGameList', 'get', data)
