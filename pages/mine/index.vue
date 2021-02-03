<template>
	<view class="login-content">
		<view class="login-block">
			<image
			  v-if="id&&userInfo.avatarUrl"
				class="avatar"
				slot="right"
				:src="userInfo.avatarUrl"
			/>
			<view v-else class="no-img"></view>
			<view class="block-r">
				<text @click="login">{{id&&userInfo.nickName?userInfo.nickName:'去登录'}}</text>
			</view>
		</view>
		
		<scroll-view
			scroll-y
		>
			<!-- <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius"> -->
			<template v-if="userType+''==='1'">
				<row-button
					label="累计采购"
					:value="(data.totalMoney||'--')+'元'"
				/>
				<row-button
					label="咨询客服"
					arrow
				/>
				<row-button
					label="资质认证"
					value="去认证>"
					@click.native="qualifications"
				/>
				<row-button
					label="清除缓存"
					arrow
					@click.native="clear"
				/>
				<row-button
					label="当前版本"
					value="1.0.0"
				/>
			</template>
			<template v-else>
				<row-button
					label="订单笔数"
					:value="(data.total||'--')+'笔'"
				/>
				<row-button
					label="订单金额"
					:value="(data.totalMoney||'--')+'元'"
				/>
				<row-button
					label="查看订单"
					arrow
					@click.native="gotoOrder"
				/>
				<row-button
					label="我的邀请码"
					arrow
					@click.native="gotoInvite"
				/>
				<row-button
					label="清除缓存"
					arrow
					@click.native="clear"
				/>
				<row-button
					label="当前版本"
					value="1.0.0"
				/>
			</template>
			
			<!-- </view> -->
			<!-- <view class="cu-tabbar-height"></view> -->
		</scroll-view>
	</view>
</template>

<script>
import RowButton from '@/components/row-button';
import {getUserInfo} from "@/api/auth.js"
export default {
  components: {
    RowButton,
  },
  data() {
    return {
			userInfo:this.userInfo=this.$store.getUserInfo()?.userInfo,
			data: {},
			id:this.$store.getLoginInfo()?.userId,
			userType: '1'
    };
  },
	async onReady() {
		console.log()
		const id=this.$store.getLoginInfo()?.userId;
		this.userType=this.$store.getLoginInfo()?.userType||'1';
		if(id) {
			this.userInfo=this.$store.getUserInfo()?.userInfo;
			this.getUserInfo();
		}
	},
  methods: {
		getUserInfo(){
			const that=this;
			const loginInfo=that.$store.getLoginInfo()||{};
			getUserInfo({
				userId:loginInfo.userId,
				userType:loginInfo.userType
			}).then(({data})=>{
				that.data=data.data||{};
			}).finally((e)=>{
			})
		},
		qualifications(){
			console.log('authentication')
			uni.navigateTo({
			  url: '/pages/qualifications/index',
			});
		},	
		login(){
			const id=this.$store.getLoginInfo()?.userId;
			if(id) return;
			uni.navigateTo({
			  url: '/pages/login/index',
			});
		},
		clear(){
			this.$store.setLoginInfo(null);
			this.$store.setUserInfo(null);
			this.$store.setAddrsInfo(null);
			this.$store.setRequestSubscribeMessage(null);
			this.$store.setOrder(null);
			this.userInfo={};
			this.data={};
			this.userType='1';
			uni.$emit('cleanUpCache');
			uni.$emit('shoppingCartCount',0);
			this.$tips('成功','缓存清理成功');
		},
		gotoOrder(){
			uni.navigateTo({
			  url: '/pages/salesman/order/index',
			});
		},
    gotoInvite() {
      uni.navigateTo({
        url: '/pages/invite/index?id='+this.data.invitationCode,
      });
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
.login-content{
	position: absolute;
	top: 60px;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 9;
}
.login-block{
	background-color: var(--background-color-0);
	margin-bottom: 10px;
	display: flex;
	padding: 20rpx;
	align-items: flex-start;
	.block-r{
		font-size: 40rpx;
		font-weight: 600;
		margin-top: 20rpx;
	}
}
.no-img{
	background-color: #e0e0e0;
}
.avatar,.no-img {
	width: 100px;
	height: 100px;
	margin-right: 40rpx;
}
</style>
