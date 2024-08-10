<script setup lang="ts">
import { getMemberAddressAPI } from '@/services/address'
import type { AddressItem } from '@/types/address'
import { onMounted, ref } from 'vue'
const AddressList = ref<AddressItem[]>([])
const getMemberAddressData = async () => {
  const res = await getMemberAddressAPI()
  console.log(res.result)
  AddressList.value = res.result
}
onMounted(() => {
  getMemberAddressData()
})
// 子传父
const emit = defineEmits<{
  (event: 'close', item?: AddressItem): void
}>()
// 高亮下标
const activeIndex = ref(0)
console.log(activeIndex.value)
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @tap="emit('close')"></text>
    <!-- 标题 -->
    <view class="title">配送至</view>
    <!-- 内容 -->
    <view class="content">
      <view
        class="item"
        v-for="(item, index) in AddressList"
        :key="item.id"
        @tap=";(activeIndex = index), emit('close', item)"
      >
        <view class="userItem">
          <view class="user">{{ item.receiver }} {{ item.contact }}</view>
          <view class="address">{{ item.fullLocation }}{{ item.address }}</view>
        </view>
        <text class="icon" :class="{ checked: index === activeIndex }"></text>
      </view>
    </view>
    <view class="footer">
      <view class="button primary"> 新建地址 </view>
      <view v-if="false" class="button primary">确定</view>
    </view>
  </view>
</template>

<style lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
}

.content {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon::before {
    content: '\e6cd';
    font-family: 'erabbit' !important;
    font-size: 38rpx;
    color: #999;
  }
  .icon.checked::before {
    content: '\e6cc';
    font-size: 38rpx;
    color: #27ba9b;
  }
  .icon-checked {
    color: #27ba9b;
  }
  .icon-ring {
    color: #444;
  }
  .user {
    font-size: 28rpx;
    color: #444;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #666;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
}
</style>
