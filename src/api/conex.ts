//idc接口
import request from '@/utils/request'

const api_8084:string = import.meta.env.VITE_PATH_8084;
const api_8086:string = import.meta.env.VITE_PATH_8086;

export const selectPlace_post = (data: any) => request({url: api_8084 + '/conex/selectPlace', method: 'post', data})
export const selectBeforeOrder_post = (data: any) => request({url: api_8084 + '/conex/selectBeforeOrder', method: 'post', data})
export const changeToWork_post = (data: any) => request({url: api_8084 + '/conex/changeToWork', method: 'post', data})
export const getOeeState_post = (data: any) => request({url: api_8084 + '/conex/getOeeState', method: 'post', data})
export const backreportm_post = (data: any) => request({url: api_8084 + '/conex/backreportm', method: 'post', data})
export const beforeOrderNumber_post = (data: any) => request({url: api_8084 + '/conex/beforeOrderNumber', method: 'post', data})
export const selectOrderDrawing_post = (data: any) => request({url: api_8084 + '/conex/selectOrderDrawing', method: 'post', data})
export const selectAgoOrder_post = (data: any) => request({url: api_8084 + '/conex/selectAgoOrder', method: 'post', data})
export const halfWork_post = (data: any) => request({url: api_8084 + '/conex/halfWork', method: 'post', data})
export const checkSuite_post = (data: any) => request({url: api_8084 + '/conex/checkSuite', method: 'post', data})
export const already_post = (data: any) => request({url: api_8084 + '/conex/already', method: 'post', data})
export const changeInspection_post = (data: any) => request({url: api_8084 + '/conex/changeInspection', method: 'post', data})
export const finishOrder_post = (data: any) => request({url: api_8084 + '/conex/finishOrder', method: 'post', data})
export const changeToFree_post = (data: any) => request({url: api_8084 + '/conex/changeToFree', method: 'post', data})
export const changeThree_post = (data: any) => request({url: api_8084 + '/conex/changeThree', method: 'post', data})
export const updateworkno_post = (data: any) => request({url: api_8084 + '/conex/updateworkno', method: 'post', data})
export const importworkno_post = (data: any) => request({url: api_8084 + '/conex/importworkno', method: 'post', data})

export const selectToInspection_post = (data: any) => request({url:  api_8084 + '/conex/selectToInspection', method: 'post', data})
export const backDate_post = (data: any) => request({url: api_8084 + '/conex/backDate', method: 'post', data})
export const comeBackWork_post = (data: any) => request({url: api_8084 + '/conex/comeBackWork', method: 'post', data})
export const batch_post = (data: any) => request({url: api_8086 + '/conex/batch', method: 'post', data})
export const fqcSelect_post = (data: any) => request({url: api_8084 + '/conex/fqcSelect', method: 'post', data})
export const getFqcListBody_post = (data: any) => request({url: api_8084 + '/conex/getFqcListBody', method: 'post', data})
export const saveDetail_post = (data: any) => request({url: api_8084 + '/conex/saveDetail', method: 'post', data})
export const nameSelect_post = (data: any) => request({url: api_8084 + '/conex/nameSelect', method: 'post', data})
export const saveFQCRecord_post = (data: any) => request({url: api_8084 + '/conex/saveFQCRecord', method: 'post', data})
export const inspectionSite_post = (data: any) => request({url: api_8084 + '/conex/inspectionSite', method: 'post', data})
export const inspectionOrder_post = (data: any) => request({url: api_8084 + '/conex/inspectionOrder', method: 'post', data})
export const selectToInspection_6820_post = (data: any) => request({url: api_8084 + '/conex/selectToInspection', method: 'post', data})
export const testByOther_post = (data: any) => request({url: api_8084 + '/conex/testByOther', method: 'post', data})