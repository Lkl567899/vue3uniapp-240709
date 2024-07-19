<script setup lang="ts">
import { GetGoodsAPI } from '@/services/goods'
import type { GoodsResult } from '@/types/goods'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import AddressPanel from './components/AddressPanel.vue'
import ServicePanel from './components/ServicePanel.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
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
// 打开弹出层
const open = (key: typeof popupKey.value) => {
  // 根据密匙打开对应组件
  popupKey.value = key
  popup.value?.open()
}
// 定义密匙
const popupKey = ref<'service' | 'address'>()
// 弹层实例
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
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
    <!-- 商品简介 -->
    <view class="meta">
      <view class="price">
        <text class="symbol">¥</text>
        <text class="number">{{ goods?.price }}</text>
      </view>
      <view class="name ellipsis">{{ goods?.name }}</view>
      <view class="desc">{{ goods?.desc }}</view>
    </view>
    <!-- 操作面板 -->
    <view class="action">
      <view class="item" @tap="open('service')">
        <text class="label">选择</text>
        <view class="box">
          <text class="text">请选择商品规格</text>
          <uni-icons type="right" size="18"></uni-icons>
        </view>
      </view>
      <view class="item" @tap="open('address')">
        <text class="label">送至</text>
        <view class="box">
          <text class="text">请选择收获地址</text>
          <uni-icons type="right" size="18"></uni-icons>
        </view>
      </view>
      <view class="item">
        <text class="label">服务</text>
        <view class="box">
          <view class="abc">无忧退 快速退款 免费包邮</view>
          <uni-icons type="right" size="18"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <view class="detail">
      <view class="title">
        <text class="text">详情</text>
      </view>
      <view class="content">
        <view class="item" v-for="item in goods?.details.properties" :key="item.name">
          <text class="label">{{ item.name }}</text>
          <text class="value">{{ item.value }}</text>
        </view>
      </view>
      <!-- 图片详情 -->
      <image
        v-for="item in goods?.details.pictures"
        :key="item"
        :src="item"
        mode="widthFix"
      ></image>
    </view>
    <!-- 同类推荐 -->
    <view class="similar">
      <view class="title">
        <text class="text">同类推荐</text>
      </view>
    </view>
    <view class="content">
      <navigator class="goods" v-for="item in goods?.similarProducts" :key="item.id">
        <image class="image" mode="aspectFill" :src="item.picture"></image>
        <view class="name ellipsis">{{ item.name }}</view>
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ item.price }}</text>
        </view>
      </navigator>
    </view>
  </scroll-view>
  <!-- 底部 -->
  <view class="footer" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <view class="icomItem">
        <uni-icons type="heart" size="20"></uni-icons>
        <view>收藏</view>
      </view>
      <view class="icomItem">
        <uni-icons type="chatbubble" size="20"></uni-icons>
        <view>客服</view>
      </view>
      <view class="icomItem">
        <uni-icons type="cart" size="20"></uni-icons>
        <view>购物车</view>
      </view>
    </view>
    <view class="buttons">
      <view class="addcart">加入购物车</view>
      <view class="payment">立即购买</view>
    </view>
  </view>
  <!-- 弹出层 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <ServicePanel v-if="popupKey === 'service'" @close="popup?.close()"></ServicePanel>
    <AddressPanel v-if="popupKey === 'address'" @close="popup?.close()"></AddressPanel>
  </uni-popup>
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
.meta {
  border-bottom: 1rpx solid #eaeaea;
  background-color: #fff;
  .price {
    padding: 35rpx 30rpx;
    color: #fff;
    font-size: 34rpx;
    box-sizing: border-box;
    background-color: #35c8a9;
    .number {
      font-size: 40rpx;
    }
  }
  .name {
    margin: 20rpx;
    font-size: 32rpx;
    color: #333;
  }
  .desc {
    padding: 0 20rpx 30rpx;
    font-size: 24rpx;
    color: #cf4444;
  }
}
.action {
  padding: 0 20rpx;
  background-color: #fff;
  .item {
    border-bottom: 1px solid #eaeaea;
    padding: 25rpx 0;
    display: flex;
    align-items: center;
    .label {
      font-size: 25rpx;
      padding-right: 25rpx;
    }
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      .abc {
        font-size: 26rpx;
      }
    }
  }
}
.detail {
  padding-left: 20rpx;
  background-color: #fff;
  margin: 25rpx 0;
  .title {
    padding: 25rpx 0;
    font-weight: 600;
    font-size: 28rpx;
    .text {
      padding-left: 10rpx;
      border-left: 5rpx #27ba9b solid;
    }
  }
  .content {
    background-color: #fff;

    .item {
      border-bottom: 1rpx solid #eaeaea;
      padding: 10rpx 0;
      font-size: 24rpx;
      color: #333;
      display: flex;
      line-height: 2;
      width: 100%;
      .label {
        width: 200rpx;
      }
      .value {
        flex: 1;
      }
    }
  }
}
.similar {
  background-color: #fff;
  padding-left: 20rpx;
  .title {
    padding: 25rpx 0;
    font-weight: 600;
    font-size: 28rpx;
    .text {
      padding-left: 10rpx;
      border-left: 5rpx #27ba9b solid;
    }
  }
}
.content {
  padding: 0 20rpx 20rpx 20rpx;
  background-color: #f4f4f4;
  overflow: hidden;
  navigator {
    width: 335rpx;
    padding: 20rpx;
    margin: 20rpx 10rpx;
    border-radius: 10rpx;
    background-color: #fff;
    float: left;
    .image {
      height: 260rpx;
    }
    .name {
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }
    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }
    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }
}
.footer {
  background: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1px solid #eaeaea;
  display: flex;
  box-sizing: content-box;
  .icons {
    display: flex;
    align-items: center;
    .icomItem {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 0 12rpx;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-evenly;
    .addcart,
    .payment {
      width: 200rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      background-color: #ffa868;
      border-radius: 72rpx;
    }
    .addcart {
      padding-right: 10rpx;
    }
    .payment {
      background-color: #27ba9b;
    }
  }
}
</style>
