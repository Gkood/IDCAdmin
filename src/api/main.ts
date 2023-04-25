//idc接口
import request from '@/utils/request'

const api:string = import.meta.env.VITE_API_CAPACITY_ARRANGE;

export const getStaffList_get = (params: any) => request({url: api + '/getStaffList', method: 'get', params})
export const getWorkOrderList_get = (params: any) => request({url: api + '/getWorkOrderList', method: 'get', params})
export const getMachList_get = (params: any) => request({url: api + '/getMachList', method: 'get', params})
export const getFinsihOrderList_get = (params: any) => request({url: api + '/getFinsihOrderList', method: 'get', params})

export const postDispatch_post = (data: any) => request({url: api + '/dispatch', method: 'post', data})
export const cancelDispatch_post = (data: any) => request({url: api + '/cancelDispatch', method: 'post', data})
export const getNameById_post = (data: any) => request({url: api + '/getNameById', method: 'post', data})
export const getWorkOrderDetail_post = (data: any) => request({url: api + '/getWorkOrderDetail', method: 'post', data})
export const getWorkOrderList_post = (data: any) => request({url: api + '/getWorkOrderList', method: 'post', data})
export const getAngByWorkorder_post = (data: any) => request({url: api + '/getAngByWorkorder', method: 'post', data})
export const getMaterialInfo_post = (data: any) => request({url: api + '/getMaterialInfo', method: 'post', data})
export const startWork_post = (data: any) => request({url: api + '/startWork', method: 'post', data})
export const getMaterialDataForAll_post = (data: any) => request({url: api + '/getMaterialDataForAll', method: 'post', data})
export const getPersonAndMaterial_post = (data: any) => request({url: api + '/getPersonAndMaterial', method: 'post', data})
export const proProcess_post = (data: any) => request({url: api + '/proProcess', method: 'post', data})

