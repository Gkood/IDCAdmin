//idc接口
import request from '@/utils/request'

const api_8084:string = import.meta.env.VITE_PATH_8084;

export const postOrder_post = (data: any) => request({url: api_8084 + '/toYh/postOrder', method: 'post', data})
export const getReason_post = (data: any) => request({url: api_8084 + '/getReason', method: 'post', data})
export const selectOrderByTime_post = (data: any) => request({url: api_8084 + '/selectOrderByTime', method: 'post', data})