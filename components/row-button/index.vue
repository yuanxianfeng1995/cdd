<template>
  <button
    class="row-button"
    :data-top-border="topBorder"
  >
    <text>{{ label }}</text>
    <view class="right">
      <slot name="right" />
      <text
        class="value"
        v-if="value"
      >{{ value }}</text>
      <arrow
        class="arrow"
        v-if="arrow"
      />
    </view>
  </button>
</template>
<script>
import Arrow from '../arrow';
export default {
  components: {
    Arrow,
  },
  props: {
    topBorder: Boolean,
    arrow: Boolean,
    label: String,
    value: String,
  },
};
</script>
<style lang="scss" scoped>
.row-button {
  border-radius: 0;
  width: 100%;
  font-size: 30rpx;
  background-color: var(--background-color-0);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 25rpx;
  text {
    color: var(--font-color-0);
  }
  &::after {
    border-width: 0;
    border-radius: 0;
    border-color: #ddd;
    border-bottom-width: 1rpx;
  }
  &[data-top-border='true'] {
    &::after {
      border-top-width: 1rpx;
    }
  }
}
.value {
  color: var(--font-color--4);
}
.right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
