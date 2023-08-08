//idc接口
import request from '@/utils/request'

const api_8083:string = import.meta.env.VITE_PATH_8083;

export const getStaffList_get = (params: any) => request({url: api_8083 + '/capacity_arrange/getStaffList', method: 'get', params})
export const getWorkOrderList_get = (params: any) => request({url: api_8083 + '/capacity_arrange/getWorkOrderList', method: 'get', params})
export const getMachList_get = (params: any) => request({url: api_8083 + '/capacity_arrange/getMachList', method: 'get', params})
export const getFinsihOrderList_get = (params: any) => request({url: api_8083 + '/capacity_arrange/getFinsihOrderList', method: 'get', params})
export const postDispatch_post = (data: any) => request({url: api_8083 + '/capacity_arrange/dispatch', method: 'post', data})
export const cancelDispatch_post = (data: any) => request({url: api_8083 + '/capacity_arrange/cancelDispatch', method: 'post', data})
export const getNameById_post = (data: any) => request({url: api_8083 + '/capacity_arrange/getNameById', method: 'post', data})
export const getWorkOrderDetail_post = (data: any) => request({url: api_8083 + '/capacity_arrange/getWorkOrderDetail', method: 'post', data})
export const getWorkOrderList_post = (data: any) => request({url: api_8083 + '/capacity_arrange/getWorkOrderList', method: 'post', data})
export const getAngByWorkorder_post = (data: any) => request({url: api_8083 + '/capacity_arrange/getAngByWorkorder', method: 'post', data})
export const getMaterialInfo_post = (data: any) => request({url: api_8083 + '/capacity_arrange/getMaterialInfo', method: 'post', data})
export const startWork_post = (data: any) => request({url: api_8083 + '/capacity_arrange/startWork', method: 'post', data})
export const getMaterialDataForAll_post = (data: any) => request({url: api_8083 + '/capacity_arrange/getMaterialDataForAll', method: 'post', data})
export const getPersonAndMaterial_post = (data: any) => request({url: api_8083 + '/capacity_arrange/getPersonAndMaterial', method: 'post', data})
export const proProcess_post = (data: any) => request({url: api_8083 + '/capacity_arrange/proProcess', method: 'post', data})
export const delArrange_post = (data: any) => request({url:  api_8083 + '/capacity_arrange/delArrange', method: 'post', data})
export const changeImport_post = (data: any) => request({url:  api_8083 + '/capacity_arrange/changeImport', method: 'post', data})
export const importArrange_post = (data: any) => request({url:  api_8083 +'/capacity_arrange/importArrange', method: 'post', data})
export const importArrangeNow_post = (data: any) => request({url:  api_8083 +'/capacity_arrange/importArrangeNow', method: 'post', data})

