<script setup lang="ts">
import { computed, ref } from 'vue'
import { GetCategoryTtopAPI } from '@/services/category'
import { GetHomeBannerAPI } from '@/services/home'
import type { CategoryTopItem } from '@/types/category'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
// 高亮下标
const activeIndex = ref(0)
// 获取分类列表数据
const categoryList = ref<CategoryTopItem[]>([])
const GetCategoryTtopData = async () => {
  const res = await GetCategoryTtopAPI()
  categoryList.value = res.result
  console.log(res.result)
}
// 获取轮播图数据
const BannerList = ref<BannerItem[]>([])
const GetBannerData = async () => {
  const res = await GetHomeBannerAPI(2)
  BannerList.value = res.result
}
// 页面加载
onLoad(() => {
  GetCategoryTtopData()
  GetBannerData()
})
// 获取二级分类数据
const subCategoryList = computed(() => {
  return categoryList.value[activeIndex.value]?.children || []
})
</script>

<template>
  <view class="category">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryList"
          :key="item.id"
          class="item"
          :class="{ active: index === activeIndex }"
          @tap="activeIndex = index"
        >
          <text class="name"> {{ item.name }} </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view scroll-y class="secondary">
        <!-- 焦点图 -->
        <XtxSwiper class="banner" :list="BannerList" />
        <view class="panel" v-for="item in subCategoryList" :key="item.id">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <!-- 商品 -->
          <view class="section">
            <navigator
              class="goods"
              :url="`/pages/goods/goods?id=${goods.id}`"
              hover-class="none"
              v-for="goods in item.goods"
              :key="goods.id"
            >
              <image class="image" :src="goods.picture"></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.category {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
  .input {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 26rpx;
    color: #8b8b8b;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: #f3f4f4;
  }
}
.icon-search {
  &::before {
    margin-right: 10rpx;
  }
}
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
  .primary {
    overflow: hidden;
    width: 180rpx;
    flex: none;
    background-color: #f6f6f6;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 96rpx;
      font-size: 26rpx;
      color: #595c63;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 42rpx;
        bottom: 0;
        width: 96rpx;
        border-top: 1rpx solid #e3e4e7;
      }
    }
    .active {
      background-color: #fff;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 8rpx;
        height: 100%;
        background-color: #27ba9b;
      }
    }
  }
  .primary .item:last-child::after,
  .primary .active::after {
    display: none;
  }
}
.secondary {
  background-color: #fff;
  .panel {
    margin: 0 30rpx 0rpx;
  }
  .title {
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f7f7f8;
    display: flex;
    justify-content: space-between;
    .more {
      font-size: 24rpx;
      color: #999;
    }
  }
  .more {
    &::after {
      font-family: 'erabbit' !important;
      content: '\e6c2';
    }
  }
  .section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;
    .goods {
      width: 150rpx;
      margin: 0rpx 30rpx 20rpx 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
      image {
        width: 150rpx;
        height: 150rpx;
      }
      .name {
        padding: 5rpx;
        font-size: 22rpx;
        color: #333;
      }
      .price {
        padding: 5rpx;
        font-size: 18rpx;
        color: #cf4444;
      }
      .number {
        font-size: 24rpx;
        margin-left: 2rpx;
      }
    }
  }
}
</style>
