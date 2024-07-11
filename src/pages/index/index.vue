<script setup lang="ts">
import { GetHomeBannerAPI, GetHomeCategoryAPI, GetHomeHotMutliAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import skeleton from './components/skeleton.vue'
// 下拉刷新状态
const isTriggered = ref(false)
// 是否加载中标记
const isLoading = ref(false)
// 页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([GetHomeBannerData(), GetHomeCategoryData(), GetHomeHotMutliData()])
  isLoading.value = false
})
// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const GetHomeBannerData = async () => {
  const res = await GetHomeBannerAPI()
  bannerList.value = res.result
}
// 获取首页分类数据
const CategoryList = ref<CategoryItem[]>([])
const GetHomeCategoryData = async () => {
  const res = await GetHomeCategoryAPI()
  CategoryList.value = res.result
}
// 获取热门推荐数据
const HotList = ref<HotItem[]>([])
const GetHomeHotMutliData = async () => {
  const res = await GetHomeHotMutliAPI()
  HotList.value = res.result
}
const guessRef = ref<XtxGuessInstance>()
// 触底时触发
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
// 下拉刷新
const onRefresherrefresh = async () => {
  isTriggered.value = true
  // 重置数据
  guessRef.value?.resetData()
  await Promise.all([GetHomeBannerData(), GetHomeCategoryData(), GetHomeHotMutliData()])
  isTriggered.value = false
}
</script>

<template>
  <CustomNavbar></CustomNavbar>
  <scroll-view
    scroll-y
    class="scroll"
    @scrolltolower="onScrolltolower"
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
  >
    <skeleton v-if="isTriggered"></skeleton>
    <template v-else>
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <CategoryPanel :list="CategoryList"></CategoryPanel>
      <HotPanel :list="HotList"></HotPanel>
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll {
  flex: 1;
}
</style>
