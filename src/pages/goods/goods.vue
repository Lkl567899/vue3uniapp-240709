<script setup lang="ts">
import { GetGoodsAPI } from '@/services/goods'
import type { GoodsResult } from '@/types/goods'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// 指示点准备
const currentIndex = ref(0)
// 接收页面参数
const query = defineProps<{
  id: string
}>()
// 获取详情数据
const goods = ref<GoodsResult>()
const GetGoodsData = async () => {
  const res = await GetGoodsAPI(query.id)
  console.log(res.result)
  goods.value = res.result
}
// 初始调用
onLoad(() => {
  GetGoodsData()
})
// 轮播图高亮事件
const onChange: UniHelper.SwiperOnChange = (e) => {
  currentIndex.value = e.detail.current
}
// 大图预览
const onTapImage = (item: string) => {
  console.log(item)
  uni.previewImage({
    urls: goods.value!.mainPictures,
    current: item,
  })
}
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 商品信息 -->
    <view class="goods">
      <!-- 轮播图 -->
      <view class="preview">
        <swiper circular @change="onChange">
          <swiper-item v-for="item in goods?.mainPictures" :key="item">
            <image @tap="onTapImage(item)" :src="item" mode="scaleToFill" />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">{{ currentIndex + 1 }}</text>
          <text class="split">/</text>
          <text class="total">{{ goods?.mainPictures.length }}</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.viewport {
  background-color: #f4f4f4;
}
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    .indicator {
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      height: 40rpx;
      padding: 0 24rpx;
      border-radius: 30rpx;
      line-height: 40rpx;
      background-color: rgba(0, 0, 0, 0.3);
      font-family: Arial, Helvetica, sans-serif;
      color: #fff;
      .split {
        margin: 0 1rpx 0 2rpx;
      }
    }
  }
}
</style>
