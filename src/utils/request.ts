import axios from 'axios'
import {Message, MessageBox, Notification} from 'element-ui'
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
    //baseURL: '',
    timeout: 20000
})

// Request interceptors
service.interceptors.request.use(
    (config) => {
        //开始进度
        NProgress.start()
        //todo token
        //config.headers['Authorization'] = UserModule.token;
        return config
    },
    (error) => {
        NProgress.done()
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response) => {
        let obj: any = {
            200: async () => {

            },
            401: async () => {

            },
            10500: async () => {//未知错误
                // Message({
                //     message: response.data.state.msg,
                //     type: 'error',
                //     duration: 5 * 1000
                // })
            }
        }
        try {
            obj[response.data.state.code]();
        } catch (e) {

        }
        NProgress.done()
        return Promise.resolve(response.data)
    },
    (error) => {
        let obj: any = {
            401: async () => {//认证失败，无法访问系统资源

            },
            403: async () => {//当前操作没有权限

            },
            10500: async () => {//未知错误
                Message({
                    message: error.response.data.state.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        }
        try {
            obj[error.response.state.code]();
        } catch (e) {

        }
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        NProgress.done()
        return Promise.reject(error)
    }
)

export default service
