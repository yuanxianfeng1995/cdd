<template>
  <view
    class="arrow"
    :style="style"
  />
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 15,
    },
    styleInner: String,
  },
  computed: {
    style() {
      const size = this.size;
      return `width: ${size}rpx;height: ${size}rpx;${this.styleInner}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.arrow {
  display: block;
  width: 15rpx;
  height: 15rpx;
  border-width: 2rpx 2rpx 0 0;
  border-style: solid;
  border-color: var(--border-color-1);
  transform: rotateZ(45deg);
}
</style>
