import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

/**
 * 获取购物车列表
 */
export const GetMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}
/**
 * 修改购物车单品
 */
export const PutMemberCartByIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

/**
 * 删除/清空购物车
 */
export const DelMemberCartAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}
/**
 * 添加商品到购物车
 */
export const PostMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}
/**
 * 购物车全选/取消全选
 */
export const PutMemberCartSelectedAPI = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
