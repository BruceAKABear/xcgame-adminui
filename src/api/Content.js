// 应用api
import { createAPI } from '@/utils/request'
// 新增或修改
export const addOrUpdate = data => createAPI('/content/addOrUpdate', 'post', data)
// 根据ID查询
export const findById = data => createAPI('/content/findById', 'get', data)
// 分页查询
export const page = data => createAPI('/content/page', 'get', data)
// 根据ID删除
export const deleteById = data => createAPI('/content/deleteById', 'get', data)
// 查询游戏集合供下拉
export const queryContentList = data => createAPI('/content/queryContentList', 'get', data)
