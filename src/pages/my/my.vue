<script setup lang="ts">
import { useGuessList } from '@/composables/index'
import { useMemberStore } from '@/stores'
const { safeAreaInsets } = uni.getSystemInfoSync()
const { guessRef, onScrolltolower } = useGuessList()
const orderTypes = [
  { type: 1, text: '待付款', icon: 'icon-currency' },
  { type: 2, text: '待发货', icon: 'icon-gift' },
  { type: 3, text: '待收货', icon: 'icon-check' },
  { type: 4, text: '待评价', icon: 'icon-comment' },
]
const member = useMemberStore()
</script>

<template>
  <scroll-view scroll-y enable-back-to-top class="viewport" @scrolltolower="onScrolltolower">
    <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px'}">
      <!-- 已经登录 -->
      <view class="overview" v-if="member.profile">
        <navigator url="/pagesMember/profile/profile" hover-class="none">
          <image class="avatar" mode="aspectFill" :src="member.profile.avatar"></image>
        </navigator>
        <view class="meta">
          <view class="nickname"> {{ member.profile.nickname || member.profile.account }} </view>
          <navigator class="extra" url="/pagesMember/profile/profile" hover-class="none">
            <text class="update">更新头像昵称</text>
          </navigator>
        </view>
      </view>
      <!-- 未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image
            class="avatar gray"
            mode="aspectFill"
            src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
          ></image>
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login" hover-class="none" class="nickname">
            未登录
          </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>
      <navigator class="settings" url="/pagesMember/settings/settings" hover-class="none">
        设置
      </navigator>
    </view>
    <!-- 我的订单 -->
    <view class="orders">
      <view class="title"
        >我的订单
        <navigator class="navigator" url="/pagesOrder/list/list?type=0" hover-class="none">
          查看全部订单<text class="icon-right"></text>
        </navigator>
      </view>
      <view class="section">
        <!-- 订单 -->
        <navigator
          v-for="item in orderTypes"
          :key="item.type"
          :class="item.icon"
          :url="`/pagesOrder/list/list?type=${item.type}`"
          class="navigator"
          hover-class="none"
        >
          {{ item.text }}
        </navigator>
        <!-- 客服 -->
        <button class="contact icon-handset" open-type="contact">售后</button>
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="guess">
      <XtxGuess ref="guessRef"></XtxGuess>
    </view>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}
.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/center_bg.png);
  background-size: 100% auto;
  .guess {
    background-color: #f7f7f8;
    margin-top: 20rpx;
  }
  .profile {
    margin-top: 20rpx;
    position: relative;
    display: flex;

    .overview {
      display: flex;
      height: 120rpx;
      padding: 0 36rpx;
      color: #fff;
    }
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: #eee;
    }
    .gray {
      filter: grayscale(100%);
    }
    .settings {
      position: absolute;
      bottom: 0;
      right: 40rpx;
      font-size: 25rpx;
      color: #fff;
    }
    .meta {
      padding: 16rpx 0;
      margin-left: 20rpx;
      .nickname {
        max-width: 350rpx;
        margin-bottom: 16rpx;
        font-size: 30rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .update {
        padding: 3rpx 10rpx 1rpx;
        border: 1px solid #fff;
        border-radius: 30rpx;
        font-size: 20rpx;
      }
      .tips {
        font-size: 20rpx;
      }
    }
  }
  .orders {
    position: relative;
    z-index: 99;
    padding: 30rpx;
    margin: 50rpx 20rpx 0;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
    .title {
      height: 40rpx;
      line-height: 40rpx;
      font-size: 28rpx;
      color: #1e1e1e;
      .navigator {
        font-size: 24rpx;
        color: #939393;
        float: right;
      }
    }
    .section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 40rpx 20rpx 10rpx;
      .navigator,
      .contact {
        text-align: center;
        font-size: 24rpx;
        color: #333;
        &::before {
          display: block;
          font-size: 60rpx;
          color: #ff9545;
        }
      }
      .contact {
        padding: 0;
        margin: 0;
        border: 0;
        background-color: transparent;
        line-height: inherit;
      }
    }
  }
}
</style>
