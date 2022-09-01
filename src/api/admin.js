import request_cong from '@/utils/request_ai.js'

/*
**
**现金流卡牌相关接口
**
 */

// 登录/demo
// export function admin_login(data) {
// 	return request_cong.post('/v1/Login', data, { login: false })
// }

// 查询卡牌列表/demo
export function GetCardList(data) {
	return request_cong.get('/getcardlist', data)
}
// 新增或修改卡牌信息/demo
export function OperateCard(data) {
	return request_cong.post('/operatecard', data)
}
// 删除卡牌/demo
export function DeleteCard(data) {
	return request_cong.delete('/deletecard', data)
}

// 查询角色列表/demo
export function GetRoleList(data) {
	return request_cong.get('/getrolelist', data)
}
// 新增或修改角色信息/demo
export function OperateRole(data) {
	return request_cong.post('/operaterole', data)
}
// 删除角色/demo
export function DeleteRole(data) {
	return request_cong.delete('/deleterole', data)
}

// 查询分类列表/demo
export function GetCategoryList(data) {
	return request_cong.get('/getcategorylist', data)
}
// 新增或修改分类信息/demo
export function CreateCategory(data) {
	return request_cong.post('/createcategory', data)
}
// 删除分类/demo
export function DeleteCategory(data) {
	return request_cong.delete('/deletecategory', data)
}

// 查询方法列表/demo
export function GetMethodList(data) {
	return request_cong.get('/getmethodlist', data)
}
// 新增或修改方法信息/demo
export function CreateMethod(data) {
	return request_cong.post('/createmethod', data)
}
// 删除方法/demo
export function DeleteMethod(data) {
	return request_cong.delete('/deletemethod', data)
}

// // 新增用户/demo
// export function admin_create(data) {
// 	return request_cong.post('/api/v1/admin/user/', data)
// }
//
// // 查询某个用户的详情/demo
// export function admin_details(data) {
// 	return request_cong.get('/api/v1/admin/user/' + data)
// }
//
// // 考勤汇总列表查询/demo
// export function get_admin_work_count(data) {
// 	return request_cong.get('/administrator/adminWorkTime/summary/', data)
// }
//
// // 下载考勤汇总/demo
// export function download_admin_work(data) {
// 	return request_cong.post('/administrator/adminWorkTime/summary/', data)
// }
//
// /*
// **员工状态
// **
//  */
// // 查询员工状态列表/demo
// export function get_state(data) {
// 	return request_cong.get('/api/v1/admin/state/', data)
// }
//
// // 新增/修改状态/demo
// export function add_state(data) {
// 	return request_cong.post('/api/v1/admin/state/', data)
// }
//
// // 后台用户状态设置/demo
// export function set_state(data) {
// 	return request_cong.post('/api/v1/admin/User/state/setUp/', data)
// }
//
// // 删除后台用户状态/demo
// export function del_state(data) {
// 	return request_cong.delete(`/api/v1/admin/state/${data}`)
// }
//
// export function GetUserInfo(data) {
// 	return request_cong.get('/v1/admin/GetUserInfo', data)
// }
//
// export function OperateAdmin(data) {
// 	return request_cong.post('/v1/admin/OperateAdmin', data)
// }
