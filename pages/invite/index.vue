<template>
  <container title="我的邀请码">
    <view class="content full">
      <view class="img-wrap">
        <image
          class="img"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.haichaninfo.com%2Fapi%2Fqrcode.png.php%3Fauth%3Dhttp%3A%2F%2Fwww.haichaninfo.com%2Fxinwen%2Fshow-8401.html&refer=http%3A%2F%2Fwww.haichaninfo.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613515078&t=2f8cb22d60fb063f11233b86fe7579c5"
          @load="load"
          @error="error"
        />
      </view>
    </view>
  </container>
</template>

<script>
import loading from '@/utils/loading';
export default {
  data() {
    return {};
  },
  onLoad() {
    loading.open();
  },
  methods: {
    load() {
      loading.close();
    },
    error() {
      loading.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  @media (prefers-color-scheme: dark) {
    background-color: #191919;
  }
}
.img {
  width: 400rpx;
  height: 400rpx;
  border-radius: 10rpx;
  box-shadow: var(--box-shadow-0);
}
.img-wrap {
  padding-bottom: 120rpx;
}
</style>
