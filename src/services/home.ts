import type { PageParams } from '@/types/global'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { http } from '@/utils/http'
// 获取首页轮播图数据
export const GetHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
// 获取首页分类数据
export const GetHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}
// 获取首页热门推荐数据
export const GetHomeHotMutliAPI = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
// 获取猜你喜欢数据
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
