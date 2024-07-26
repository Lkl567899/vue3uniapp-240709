<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { Gender, ProfileDetail } from '@/types/profile'
import { GetMemberProfileAPI, PutMemberProfileAPI } from '@/services/profile'
import { useMemberStore } from '@/stores'
const { safeAreaInsets } = uni.getSystemInfoSync()
const ProfileList = ref({} as ProfileDetail)
const member = useMemberStore()
// 获取用户详情信息
const GetMemberProfileData = async () => {
  const res = await GetMemberProfileAPI()
  ProfileList.value = res.result
  console.log(res.result)
}
// 修改头像
const setAvatar = () => {
  // 调用拍照/选择图片
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      console.log(tempFilePath)
      // 文件上传
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: tempFilePath,
        success: (res) => {
          // 判断状态码是否上传成功
          if (res.statusCode === 200) {
            // 提取头像
            const { avatar } = JSON.parse(res.data).result.avatar
            // 修改当前页头像
            ProfileList.value.avatar = avatar
            // 本地化头像
            member.profile!.avatar = avatar
            uni.showToast({ icon: 'success', title: '更新成功' })
          } else {
            uni.showToast({ icon: 'error', title: '出现错误' })
          }
        },
      })
    },
  })
}
// 修改性别
const onGenderChange: UniHelper.RadioGroupOnChange = (ev) => {
  ProfileList.value.gender = ev.detail.value as Gender
}
// 修改生日
const onDateChange: UniHelper.DatePickerOnChange = (ev) => {
  ProfileList.value.birthday = ev.detail.value
}
// 修改地区
let fullLocationCode: [string, string, string] = ['', '', '']
const onRegionChange: UniHelper.RegionPickerOnChange = (ev) => {
  // 前端显示
  ProfileList.value.fullLocation = ev.detail.value.join(' ')
  // 后端显示
  fullLocationCode = ev.detail.code!
}
// 更新用户详情信息
const onSubmit = async () => {
  const { nickname, gender, birthday, profession } = ProfileList.value
  const res = await PutMemberProfileAPI({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode: fullLocationCode[0],
    cityCode: fullLocationCode[1],
    countyCode: fullLocationCode[2],
  })
  console.log(res.result)
  // 本地化昵称
  member.profile!.nickname = res.result.nickname
  // 成功提示
  uni.showToast({ title: '更新成功', icon: 'success' })
  setTimeout(() => {
    uni.navigateBack()
  }, 400)
}
onLoad(() => {
  GetMemberProfileData()
})
</script>

<template>
  <view class="viewport" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- 导航栏 -->
    <view class="navbar">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar" @tap="setAvatar">
      <image class="image" :src="ProfileList?.avatar" mode="aspectFill" />
      <text class="text">点击修改头像</text>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ ProfileList?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            v-model="ProfileList.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="ProfileList.gender === '男'" />
              男
            </label>
            <label class="radioLeft">
              <radio value="女" color="#27ba9b" :checked="ProfileList.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            mode="date"
            :value="ProfileList.birthday"
            start="1900-01-01"
            :end="new Date()"
            @change="onDateChange"
          >
            <view v-if="ProfileList.birthday">{{ ProfileList.birthday }}</view>
            <view v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="ProfileList.fullLocation?.split(' ')"
            @change="onRegionChange"
          >
            <view v-if="ProfileList.fullLocation">{{ ProfileList.fullLocation }}</view>
            <view v-else class="placeholder">请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            v-model="ProfileList.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}
.navbar {
  position: relative;
  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.avatar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 260rpx;
  justify-content: center;
  align-items: center;
  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }
  .text {
    padding-top: 20rpx;
    font-size: 26rpx;
    color: #fff;
  }
}
.form {
  .form-button {
    margin: 30rpx 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
  background-color: #f4f4f4;
  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    .radioLeft {
      margin-left: 20rpx;
    }
    &:last-child {
      border: none;
    }
    .label {
      width: 180rpx;
      color: #333;
    }
    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }
  }
}
</style>
