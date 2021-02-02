<template>
  <container title="我的邀请码">
    <view class="content full" :style="[{backgroundColor:'var(--background-color-1)'}]">
      <view class="img-wrap" v-if="src">
        <image
          class="img"
          src="src"
          @load="load"
          @error="error"
        />
      </view>
    </view>
  </container>
</template>

<script>
import loading from '@/utils/loading';
	import {getBusiness} from "@/api/auth"
export default {
  data() {
    return {
			src: null
		};
  },
  onLoad() {
    loading.open();
		this.getBusiness()
  },
  methods: {
		getBusiness(){
			const that=this;
			let userId=this.$store.getLoginInfo()?.userId;
			if(!userId) return;
			getBusiness(userId).then((data)=>{
				console.log('data',data);
				that.src=data;
			}).finally((e)=>{
				loading.close()
			})
		},
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
