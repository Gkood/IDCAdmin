//idc接口
import request from '@/utils/request'

const api_8084:string = import.meta.env.VITE_PATH_8084;

export const editDataCustomized_post = (data: any) => request({url: 'http://172.16.8.18:8991/editDataCustomized', method: 'post', data, headers: {"Content-Type": "application/json"}})
export const getpdfurl2_post = (data: any) => request({url: api_8084 + '/upload/getpdfurl2', method: 'post', data})
export const getpdfurl2upload_post = (data: any) => request({url: api_8084 + '/upload/getpdfurl2', method: 'post', data})
export const getErpApiNew_post = (data: any) => request({url: api_8084 + '/getErpApiNew', method: 'post', data})
export const sendmail_post = (data: any) => request({url: api_8084 + '/messageCenter/sendmail', method: 'post', data})

