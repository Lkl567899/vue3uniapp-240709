<script setup lang="ts">
import { delMemberAddressIdAPI, getMemberAddressAPI } from '@/services/address'
import type { AddressItem } from '@/types/address'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取收货地址
const addressList = ref<AddressItem[]>([])
const getMemberAddressData = async () => {
  const res = await getMemberAddressAPI()
  addressList.value = res.result
}
// 删除收货地址
const delMemberAddressIdData = (id: string) => {
  // 模态弹窗
  uni.showModal({
    content: '确定要删除吗？',
    success: async ({ confirm, cancel }) => {
      if (confirm) {
        // 根据id删除地址
        await delMemberAddressIdAPI(id)
        // 重新渲染
        getMemberAddressData()
      }
    },
  })
}
// 初始化调用
onShow(() => {
  getMemberAddressData()
})
</script>
<template>
  <view class="viewport">
    <scroll-view scroll-y class="scroll-view">
      <!-- 有地址 -->
      <view class="address" v-if="addressList?.length">
        <uni-swipe-action class="address-list">
          <uni-swipe-action-item class="item" v-for="item in addressList" :key="item.id">
            <view class="item-content">
              <view class="user">
                {{ item.receiver }}
                <text class="contact">{{ item.contact }}</text>
                <text v-if="item.isDefault" class="badge">默认</text>
              </view>
              <view class="locate">{{ item.fullLocation }}{{ item.address }}</view>
              <navigator
                class="edit"
                hover-class="none"
                :url="`/pagesMember/address-form/address-form?id=${item.id}`"
              >
                修改
              </navigator>
            </view>
            <template v-slot:right>
              <button @tap="delMemberAddressIdData(item.id)" class="del-btn">删除</button>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <!-- 无地址 -->
      <view class="blank" v-else> 暂无收货地址 </view>
    </scroll-view>
    <view class="addAddress">
      <navigator hover-class="none" url="/pagesMember/address-form/address-form">
        新建地址
      </navigator>
    </view>
  </view>
</template>
<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.del-btn {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #cf4444;
  border-radius: 0;
  padding: 0;
  width: 80px;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  .scroll-view {
    margin-top: 20rpx;
    .address {
      padding: 0 20rpx;
      margin: 0 20rpx;
      border-radius: 10rpx;
      background-color: #fff;
      .item-content {
        line-height: 1;
        padding: 40rpx 10rpx 38rpx;
        border-bottom: 1rpx solid #ddd;
        position: relative;
        .user {
          font-size: 28rpx;
          margin-bottom: 20rpx;
          color: #333;
          .contact {
            color: #666;
          }

          .badge {
            display: inline-block;
            padding: 8rpx 8rpx;
            margin: 0 0 0 10rpx;
            font-size: 26rpx;
            color: #27ba9b;
            border-radius: 6rpx;
            border: 1rpx solid #27ba9b;
          }
        }
        .locate {
          line-height: 1.6;
          font-size: 26rpx;
          color: #333;
        }
        .edit {
          position: absolute;
          top: 36rpx;
          right: 30rpx;
          padding: 2rpx 0 2rpx 20rpx;
          border-left: 1rpx solid #666;
          font-size: 26rpx;
          color: #666;
          line-height: 1;
        }
      }
    }
    .blank {
      margin-top: 300rpx;
      font-size: 26rpx;
      color: #333;
      text-align: center;
    }
  }
  .addAddress {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    border-radius: 80rpx;
    font-size: 26rpx;
    background-color: #27ba9b;
    color: #fff;
  }
}
</style>
