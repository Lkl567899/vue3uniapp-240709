import { http } from '@/utils/http'

/**
 * 微信支付
 * @param data // 参数
 */

export const getPaywxPayMinPayAPI = (data: { orderId: string }) => {
  return http<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data,
  })
}
/**
 * 模拟微信支付
 * @param data // 参数
 */
export const getPayMockAPI = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data,
  })
}
