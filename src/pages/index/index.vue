<script setup lang="ts">
//
import { GetHomeBannerAPI, GetHomeCategoryAPI, GetHomeHotMutliAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
// 页面加载
onLoad(() => {
  GetHomeBannerData()
  GetHomeCategoryData()
  GetHomeHotMutliData()
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
const onScrolltolower = () => {}
</script>

<template>
  <CustomNavbar></CustomNavbar>
  <scroll-view scroll-y class="scroll" @scrolltolower="onScrolltolower">
    <XtxSwiper :list="bannerList"></XtxSwiper>
    <CategoryPanel :list="CategoryList"></CategoryPanel>
    <HotPanel :list="HotList"></HotPanel>
    <XtxGuess></XtxGuess>
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
