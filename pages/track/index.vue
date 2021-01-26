<template>
  <view :style="style">
    <scroll-view
      scroll-x
      class="nav fixed"
      style="background-color:var(--background-color-0)"
      :style="[{top:CustomBar + 'px'}]"
      scroll-with-animation
      :scroll-left="scrollLeft"
    >
      <view
        class="cu-item"
        v-for="(item,index) in items"
        :class="current==item.value?'cur':''"
        :key="index"
        @tap="tabSelect(item.value)"
      >
        {{item.label}}
      </view>
    </scroll-view>
    <View
      class="card"
      v-for="(item,index) in 10"
      :key="index"
    >
      <view class="flex-row-space-between">
        <text>2020-12-22 12:21:22</text>
        <text>待付款</text>
      </view>
      <view class="flex-row">
        <view class="flex-1">
          <text>甘草</text>
          <text>x40</text>
        </view>
        <view class="flex-1">
          <text>甘草</text>
          <text>x40</text>
        </view>
      </view>
      <view class="flex-row">
        <view class="flex-1">
          <text>甘草</text>
          <text>x40</text>
        </view>
        <view class="flex-1">
          <text>甘草</text>
          <text>x40</text>
        </view>
      </view>
      <view class="flex-row-space-between">
        <view class="flex-col">
          <text style="color:red;">￥521.00</text>
          <text>千金大药房(保利麓谷林语)</text>
        </view>
        <button
          class="cu-btn shadow-blur round"
          style="background-color:var(--background-color-main-0);color:#fff;"
        >联系客户</button>
      </view>
    </View>
  </view>
</template>

<script>
export default {
  data() {
    return {
      CustomBar: this.CustomBar,
      scrollLeft: 0,
      current: 0,
      items: [
        { label: '全部', value: 0 },
        { label: '待付款', value: 1 },
        { label: '待配送', value: 2 },
        { label: '待付款', value: 3 },
      ],
    };
  },
  computed: {
    style() {
      return `margin-top:-${
        this.CustomBar - 100
      }rpx;  padding-bottom: calc(env(safe-area-inset-bottom) / 2 + 100rpx);`;
    },
  },
  methods: {
    tabSelect(value) {
      this.current = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.cur {
  color: var(--font-color-main-0);
}
.card {
  background-color: var(--background-color-0);
  margin-bottom: 20rpx;
  padding: 20rpx;
}
</style>