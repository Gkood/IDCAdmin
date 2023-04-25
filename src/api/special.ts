//idc接口
import request from '@/utils/request'

export const editDataCustomized_post = (data: any) => request({url: 'http://172.16.8.18:8991/editDataCustomized', method: 'post', data, headers: {"Content-Type": "application/json"}})
export const delArrange_post = (data: any) => request({url: 'http://192.168.80.52:7825/capacity_arrange/delArrange', method: 'post', data})
export const changeImport_post = (data: any) => request({url: 'http://192.168.80.52:7825/capacity_arrange/changeImport', method: 'post', data})
export const importArrange_post = (data: any) => request({url: 'http://192.168.80.52:7825/capacity_arrange/importArrange', method: 'post', data})
export const importArrangeNow_post = (data: any) => request({url: 'http://192.168.80.52:7825/capacity_arrange/importArrangeNow', method: 'post', data})
export const selectToInspection_post = (data: any) => request({url:  'http://172.16.8.18:6820/conex/selectToInspection', method: 'post', data})
export const getpdfurl2_post = (data: any) => request({url: 'http://192.168.80.52:8014/upload/getpdfurl2', method: 'post', data})
export const getpdfurl2upload_post = (data: any) => request({url: 'http://172.16.8.18:9074/upload/getpdfurl2', method: 'post', data})
export const getErpApiNew_post = (data: any) => request({url: 'http://172.16.8.18:9000/getErpApiNew', method: 'post', data})
export const sendmail_post = (data: any) => request({url: 'http://172.16.8.18:7888/messageCenter/sendmail', method: 'post', data})
export const backDate_post = (data: any) => request({url: 'http://172.16.8.18:6820/conex/backDate', method: 'post', data})
export const comeBackWork_post = (data: any) => request({url: 'http://172.16.8.18:6820/conex/comeBackWork', method: 'post', data})
export const batch_post = (data: any) => request({url: 'http://172.16.8.18:6820/conex/batch', method: 'post', data})