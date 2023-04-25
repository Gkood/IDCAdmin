//idc接口
import request from '@/utils/request'

const api:string = import.meta.env.VITE_API_TOYH;

export const postOrder_post = (data: any) => request({url: api + '/postOrder', method: 'post', data})


