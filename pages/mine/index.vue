<template>
	<Container style="padding-top: 100rpx;" tabbar :is-back="false" title="我的">
		<scroll-view
			scroll-y
			:style="style"
		>
			<!-- <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius"> -->
			<row-button label="头像">
				<image
					class="avatar"
					slot="right"
					:src="avatarUrl"
				/>
			</row-button>
			<row-button
				label="昵称"
				value="张三"
			/>
			<row-button
				label="订单笔数"
				value="33笔"
			/>
			<row-button
				label="订单金额"
				value="2222.00元"
			/>
			<row-button
				label="查看订单"
				arrow
			/>
			<row-button
				label="我的邀请码"
				arrow
				@click.native="gotoInvite"
			/>
			<row-button
				label="当前版本"
				value="1.0.0"
			/>
			<!-- </view> -->
			<!-- <view class="cu-tabbar-height"></view> -->
		</scroll-view>
	</Container>
</template>

<script>
import RowButton from '@/components/row-button';
import avatarUrl from '@/static/logo.png';
export default {
  components: {
    RowButton,
  },
  data() {
    return {
      avatarUrl,
    };
  },
  methods: {
    gotoInvite() {
      uni.navigateTo({
        url: '/pages/invite/index',
      });
    },
  },
  computed: {
    style() {
      return `margin-top:-${this.CustomBar}rpx`;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  .text {
    color: var(--font-color-0);
  }
}
.avatar {
  height: 60rpx;
  width: 60rpx;
  border-radius: 50%;
}
</style>
