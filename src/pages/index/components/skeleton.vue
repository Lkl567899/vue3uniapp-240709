<template name="skeleton">
  <view is="components/XtxSwiper">
    <view class="carousel XtxSwiper--carousel">
      <swiper circular="true" :interval="3000" :current="0" :autoplay="false">
        <swiper-item
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate(0%, 0px) translateZ(0px);
          "
        >
          <navigator class="navigator XtxSwiper--navigator" hover-class="none">
            <image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
          </navigator>
        </swiper-item>
      </swiper>
      <view class="indicator XtxSwiper--indicator">
        <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
        <text class="dot XtxSwiper--dot"></text>
        <text class="dot XtxSwiper--dot"></text>
        <text class="dot XtxSwiper--dot"></text>
        <text class="dot XtxSwiper--dot"></text>
      </view>
    </view>
  </view>
  <view is="pages/index/components/CategoryPanel">
    <view class="category CategoryPanel--category">
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-571 sk-text"
          >居家</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-271 sk-text"
          >锦鲤</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-862 sk-text"
          >服饰</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-878 sk-text"
          >母婴</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-431 sk-text"
          >个护</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-977 sk-text"
          >严选</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-177 sk-text"
          >数码</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-345 sk-text"
          >运动</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-653 sk-text"
          >杂项</text
        >
      </navigator>
      <navigator class="category-item CategoryPanel--category-item" hover-class="none">
        <image class="icon CategoryPanel--icon sk-image"></image>
        <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-604 sk-text"
          >品牌</text
        >
      </navigator>
    </view>
  </view>
  <view is="pages/index/components/HotPanel">
    <view class="panel HotPanel--panel hot HotPanel--hot">
      <view class="item HotPanel--item">
        <view class="title HotPanel--title">
          <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-186 sk-text"
            >特惠推荐</text
          >
          <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-175 sk-text"
            >精选全攻略</text
          >
        </view>
        <navigator class="cards HotPanel--cards" hover-class="none">
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPanel--item">
        <view class="title HotPanel--title">
          <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-717 sk-text"
            >爆款推荐</text
          >
          <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-172 sk-text"
            >最受欢迎</text
          >
        </view>
        <navigator class="cards HotPanel--cards" hover-class="none">
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPanel--item">
        <view class="title HotPanel--title">
          <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-42 sk-text"
            >一站买全</text
          >
          <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-503 sk-text"
            >精心优选</text
          >
        </view>
        <navigator class="cards HotPanel--cards" hover-class="none">
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPanel--item">
        <view class="title HotPanel--title">
          <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-783 sk-text"
            >新鲜好物</text
          >
          <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-52 sk-text"
            >生活加分项</text
          >
        </view>
        <navigator class="cards HotPanel--cards" hover-class="none">
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
    </view>
  </view>
  <view is="components/XtxGuess" class="r r">
    <view class="caption XtxGuess--caption">
      <text
        class="text XtxGuess--text sk-transparent sk-text-0-0000-514 sk-text sk-pseudo sk-pseudo-circle"
        >猜你喜欢</text
      >
    </view>
  </view>
</template>
<style lang="scss">
.sk-transparent {
  color: transparent !important;
}
.sk-text-6-2500-718 {
  background-image: linear-gradient(
    transparent 6.25%,
    #eeeeee 0%,
    #eeeeee 93.75%,
    transparent 0%
  ) !important;
  background-size: 100% 27.907rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-138 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-571 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-271 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-862 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-878 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-431 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-977 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-177 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-345 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-653 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-604 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-186 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-175 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-717 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-172 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-42 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-503 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-783 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-52 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-0-0000-514 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 31.3953rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
