<template>
  <view>
    <view
      class="cu-custom"
      :style="[{height:CustomBar + 'px'}]"
    >
      <view
        class="cu-bar fixed"
        :style="style"
        :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]"
      >
        <view
          v-if="isBack"
          class="action"
          style="color:#fff;"
          @tap="BackPage"
        >
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <slot v-else />
        <view
          class="content"
          :style="[{top:StatusBar + 'px',color:'#fff'}]"
        >
          <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
    };
  },
  name: 'cu-custom',
  computed: {
    style() {
      var StatusBar = this.StatusBar;
      var CustomBar = this.CustomBar;
      var bgImage = this.bgImage;
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`;
      }
      return style + this.styleInner;
    },
  },
  props: {
    styleInner: String,
    bgColor: {
      type: String,
      default: '',
    },
    isBack: {
      type: [Boolean, String],
      default: false,
    },
    bgImage: {
      type: String,
      default: '',
    },
		delta: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    BackPage() {
      if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
        let url = '/' + __wxConfig.pages[0];
        return uni.redirectTo({ url });
      }
      uni.navigateBack({
        delta: this.delta,
      });
    },
  },
};
</script>

<style>
</style>
