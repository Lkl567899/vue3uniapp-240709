<template>
  <scroll-view scroll-y class="scrollview">
    <navigator
      v-if="addressItem"
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="user">{{ addressItem.receiver }} {{ addressItem.contact }}</view>
      <view class="address">{{ addressItem.fullLocation }} {{ addressItem.address }}</view>
      <text class="icon icon-right"></text>
    </navigator>
    <navigator
      v-else
      class="shipment"
      hover-class="none"
      url="/pagesMember/address/address?from=order"
    >
      <view class="user">请选择收货地址</view>
      <text class="icon icon-right"></text>
    </navigator>
    <!-- 商品信息 -->
    <view class="goods">
      <navigator
        :url="`/pages/goods/goods?id=${item.id}`"
        class="item"
        hover-class="none"
        v-for="item in orderPre?.goods"
        :key="item.skuId"
      >
        <image class="picture" :src="item.picture" />
        <view class="meta">
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="attrs">{{ item.attrsText }}</view>
          <view class="prices">
            <view class="pay-price symbol">{{ item.payPrice }}</view>
            <view class="price symbol">{{ item.price }}</view>
          </view>
          <view class="count">x{{ item.count }}</view>
        </view>
      </navigator>
    </view>
    <!-- 配送及支付方式 -->
    <view class="related">
      <view class="item">
        <text class="text">配送时间</text>
        <picker :range="deliveryList" range-key="text" @change="onChangeDelivery">
          <view class="icon-fonts picker">{{ deliveryTime.text }}</view>
        </picker>
      </view>
      <view class="item">
        <text class="text">订单备注</text>
        <input
          class="input"
          :cursor-spacing="30"
          placeholder="选题，建议留言前先与商家沟通确认"
          v-model="buyerMessage"
        />
      </view>
    </view>
    <!-- 结算清单 -->
    <view class="settlement">
      <view class="item">
        <view class="text">商品总价:</view>
        <view class="price symbol">{{ orderPre?.summary.totalPrice.toFixed(2) }}</view>
      </view>
      <view class="item">
        <view class="text">运费:</view>
        <view class="price symbol">{{ orderPre?.summary.postFee.toFixed(2) }}</view>
      </view>
    </view>
  </scroll-view>
  <!-- 吸底工具栏 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="total-pay symbol">
      <text class="number">{{ orderPre?.summary.totalPayPrice.toFixed(2) }}</text>
    </view>
    <view class="button" :class="{ disabled: !addressItem?.id }" @tap="onOrderSubmit">
      提交订单
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  getMemberOrderPreAPI,
  getMemberOrderPreNowAPI,
  getMemberOrderRepurchaseByIdAPI,
  postMemberOrderAPI,
} from '@/services/order'
import { useAddressStore } from '@/stores/modules/address'
import type { OrderPreResult } from '@/types/order'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
// 自适应
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单备注
const buyerMessage = ref()
// 坐标
const deliveryIndex = ref(0)
// 配送时间
const deliveryList = ref([
  { type: 1, text: '时间不限 (周一至周日)' },
  { type: 2, text: '工作日送 (周一至周五)' },
  { type: 3, text: '周末配送 (周六至周日)' },
])
// 当前配送时间
const deliveryTime = computed(() => {
  return deliveryList.value[deliveryIndex.value]
})
// 修改配送时间
const onChangeDelivery: UniHelper.SelectorPickerOnChange = (ev) => {
  deliveryIndex.value = ev.detail.value
}
const query = defineProps<{
  skuId?: string
  count?: number
  addressId?: string
  orderId?: string
}>()
// 获取预付订单数据
const orderPre = ref<OrderPreResult>()
const getMemberOrderPreData = async () => {
  if (query.count && query.skuId) {
    // 立即购买
    const res = await getMemberOrderPreNowAPI({
      count: query.count,
      skuId: query.skuId,
      addressId: query.addressId,
    })
    orderPre.value = res.result
    console.log(res.result, '立即购买')
    return
  } else if (query.orderId) {
    const res = await getMemberOrderRepurchaseByIdAPI(query.orderId)
    orderPre.value = res.result
    console.log(res.result, '再次购买')
  } else {
    const res = await getMemberOrderPreAPI()
    orderPre.value = res.result
    return
  }
}
onLoad(() => {
  getMemberOrderPreData()
})

// 获取默认地址
const addressStore = useAddressStore()
const addressItem = computed(() => {
  return (
    addressStore.addressItem ||
    orderPre.value?.userAddresses.find((v) => v.isDefault) ||
    orderPre.value?.userAddresses[0]
  )
})
// 订单提交
const onOrderSubmit = async () => {
  console.log(addressItem.value?.id)
  if (!addressItem.value?.id) {
    return uni.showToast({ title: '请选择收货地址', icon: 'none' })
  }
  const res = await postMemberOrderAPI({
    addressId: addressItem.value?.id,
    buyerMessage: buyerMessage.value,
    deliveryTimeType: deliveryTime.value.type,
    goods: orderPre.value!.goods.map((v) => ({ count: v.count, skuId: v.skuId })),
    payChannel: 2,
    payType: 1,
  })
  console.log(res.result)
  // 关闭当前页面 跳转到订单详情
  uni.redirectTo({ url: `/pagesOrder/detail/detail?id=${res.result.id}` })
}
</script>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}
.symbol::before {
  content: '￥';
  font-size: 80%;
  margin-right: 5rpx;
}
.shipment {
  margin: 20rpx;
  padding: 30rpx 30rpx 30rpx 84rpx;
  font-size: 26rpx;
  border-radius: 10rpx;
  background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png)
    20rpx center / 50rpx no-repeat #fff;
  position: relative;
  .icon {
    font-size: 36rpx;
    color: #333;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20rpx;
  }
}
.goods {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    display: flex;
    padding: 30rpx 0;
    border-top: 1rpx solid #eee;
    &:first-child {
      border-top: none;
    }
    .picture {
      width: 170rpx;
      height: 170rpx;
      border-radius: 10rpx;
      margin-right: 20rpx;
    }
    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      .name {
        height: 80rpx;
        font-size: 26rpx;
        color: #444;
      }
      .attrs {
        line-height: 1.8;
        padding: 0 15rpx;
        margin-top: 6rpx;
        font-size: 24rpx;
        align-self: flex-start;
        border-radius: 4rpx;
        color: #888;
        background-color: #f7f7f8;
      }
      .prices {
        display: flex;
        align-items: baseline;
        margin-top: 6rpx;
        font-size: 28rpx;
      }
      .pay-price {
        margin-right: 10rpx;
        color: #cf4444;
      }

      .price {
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
    }
    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 26rpx;
      color: #444;
    }
  }
}
.related {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    display: flex;
    justify-content: space-between;
    min-height: 80rpx;
    font-size: 26rpx;
    color: #333;
    align-items: center;
    .input {
      flex: 1;
      text-align: right;
      margin: 20rpx 0;
      padding-right: 20rpx;
      font-size: 26rpx;
      color: #999;
    }
    .item,
    .text {
      width: 125rpx;
    }
    .picker {
      color: #666;
    }

    .picker::after {
      content: '\e6c2';
    }
  }
}
.settlement {
  margin: 20rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    color: #333;
    height: 80rpx;
  }
}
.toolbar {
  // position: fixed;
  // left: 0;
  // right: 0;
  // bottom: calc(var(--window-bottom));
  // z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .total-pay {
    font-size: 40rpx;
    color: #cf4444;

    .decimal {
      font-size: 75%;
    }
  }

  .button {
    width: 220rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 72rpx;
    background-color: #27ba9b;
  }

  .disabled {
    opacity: 0.6;
  }
}
</style>
