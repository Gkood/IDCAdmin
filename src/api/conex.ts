//idc接口
import request from '@/utils/request'

const api:string = import.meta.env.VITE_API_CONEX;

export const selectPlace_post = (data: any) => request({url: api + '/selectPlace', method: 'post', data})
export const selectBeforeOrder_post = (data: any) => request({url: api + '/selectBeforeOrder', method: 'post', data})
export const changeToWork_post = (data: any) => request({url: api + '/changeToWork', method: 'post', data})
export const getOeeState_post = (data: any) => request({url: api + '/getOeeState', method: 'post', data})
export const backreportm_post = (data: any) => request({url: api + '/backreportm', method: 'post', data})
export const beforeOrderNumber_post = (data: any) => request({url: api + '/beforeOrderNumber', method: 'post', data})
export const selectOrderDrawing_post = (data: any) => request({url: api + '/selectOrderDrawing', method: 'post', data})
export const selectAgoOrder_post = (data: any) => request({url: api + '/selectAgoOrder', method: 'post', data})
export const halfWork_post = (data: any) => request({url: api + '/halfWork', method: 'post', data})
export const checkSuite_post = (data: any) => request({url: api + '/checkSuite', method: 'post', data})
export const already_post = (data: any) => request({url: api + '/already', method: 'post', data})
export const changeInspection_post = (data: any) => request({url: api + '/changeInspection', method: 'post', data})
export const finishOrder_post = (data: any) => request({url: api + '/finishOrder', method: 'post', data})
export const changeToFree_post = (data: any) => request({url: api + '/changeToFree', method: 'post', data})
export const changeThree_post = (data: any) => request({url: api + '/changeThree', method: 'post', data})
export const updateworkno_post = (data: any) => request({url: api + '/updateworkno', method: 'post', data})
export const importworkno_post = (data: any) => request({url: api + '/importworkno', method: 'post', data})