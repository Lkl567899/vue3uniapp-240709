<script setup lang="ts"></script>
<template>
  <view class="viewport">
    <scroll-view scroll-y class="scroll-view">
      <!-- 有地址 -->
      <view class="address" v-if="false">
        <uni-swipe-action class="address-list">
          <uni-swipe-action-item class="item">
            <view class="item-content">
              <view class="user">
                黑马王子
                <text class="contact">13111111111</text>
                <text v-if="true" class="badge">默认</text>
              </view>
              <view class="locate">北京市 北京市 顺义区 黑马程序员</view>
            </view>
            <template v-slot:right>
              <button class="del-btn">删除</button>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <view class="address" v-else> </view>
      <!-- 无地址 -->
      <view class="blank"> 暂无收货地址 </view>
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
