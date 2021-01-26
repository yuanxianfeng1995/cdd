<template>
  <view :style="style">
    <view>
      <view
        class="card"
        v-for="(item,index) in 10"
        :key="index"
      >
        <text style="font-size:32rpx;">甘草</text>
        <view class="flex-row-space-between">
          <view class="flex-1 flex-row">
            <text class="flex-1">0.5g/3g</text>
            <text
              class="flex-1"
              style="color:red"
            >￥5.12</text>
          </view>
          <view
            class="flex-row"
            style="border:1rpx solid var(--border-color-0)"
          >
            <text style="padding:10rpx 30rpx;">-</text>
            <input
              type="number"
              value="100"
              style="text-align:center;width:80rpx;background-color:var(--background-color-1)"
            />
            <text style="padding:10rpx 30rpx;">+</text>
          </view>
        </view>
      </view>
    </view>
    <view
      class="flex-row-space-between"
      style="z-index:2;box-shadow:var(--box-shadow-0);background-color:var(--background-color-0);padding:20rpx;position:fixed;bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);width:100%;"
    >
      <view>
        <text>合计</text>
        <text style="color:red;">￥512.00</text>
      </view>
      <button
        class="cu-btn shadow-blur round"
        style="background-color:var(--background-color-main-0);color:#fff;"
      >结算</button>
    </view>
  </view>
</template>

<script>
export default {
  computed: {
    style() {
      return `margin-top:-${this.CustomBar}rpx;  padding-bottom: calc(env(safe-area-inset-bottom) / 2 + 100rpx);`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--background-color-0);
  margin-bottom: 20rpx;
  padding: 20rpx;
}
</style>