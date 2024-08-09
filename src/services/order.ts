import type { OrderPreResult } from '@/types/order'
import { http } from '@/utils/http'
/**
 *
 * 获取预付订单
 */
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre',
  })
}

/**
 *
 * 立即购买订单
 */
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: number
  addressId?: string
}) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}
