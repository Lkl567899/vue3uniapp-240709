import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

// 获取详情数据
/**
 * 商品详情
 * @param id 商品id
 */
export const GetGoodsAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
