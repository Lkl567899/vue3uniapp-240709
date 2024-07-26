import type { LoginResult } from '@/types/login'
import { http } from '@/utils/http'

/**
 * 小程序登录
 * @param data 请求参数
 */
type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}
export const postLoginWxMinAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}
// 小程序登录 内测版
export const PostSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
