import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'
// 获取分类列表
export const GetCategoryTtopAPI = () => {
  return http<CategoryTopItem[]>({
    url: '/category/top',
    method: 'GET',
  })
}
