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
				<text v-if="id&&userInfo.nickName">{{userInfo.nickName}}</text>
				<button v-else type="default" size="mini" open-type="getUserInfo" @getuserinfo="login" withCredentials="true">去登录</button>
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
					label="资质认证"
					value="去认证>"
					@click.native="qualifications"
				/>
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
			userType: '1',
			authorization: true
    };
  },
	async onReady() {
		const id=this.$store.getLoginInfo()?.userId;
		this.userType=this.$store.getLoginInfo()?.userType||'1';
		if(id) {
			this.userInfo=this.$store.getUserInfo()?.userInfo;
			this.getUserInfo();
		}
	},
  methods: {
		getUserInfo(){
			console.log('getUserInfo')
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
		login(val) {
			const that = this;
			const id=this.$store.getLoginInfo()?.userId;
			if(id) return;
			console.log('val',val)
			if(val.detail.errMsg!=='getUserInfo:ok') {
					that.$tips('提示', '用户取消授权');
					return;
			}
			wx.login({
				success(res) {
					console.log('login', res)
					var code = res.code
					if (code) {
						//发起网络请求
						// 获取微信用户信息
						wx.getUserInfo({
							success: function(val) {
								const parms = {
									...val,
									code: code,
								};
								that.$store.setUserInfo(parms);
								uni.navigateTo({
								  url: '/pages/login/index',
								});
							},
							fail: res => {
								that.$tips('提示', '用户取消授权');
							}
						})
					} else {
						that.$tips('失败', '登录失败！');
					}
				}
			})
		},
		qualifications(){
			console.log('authentication')
			uni.navigateTo({
			  url: '/pages/qualifications/index',
			});
		},	
		clear(){
			uni.clearStorage();
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
		button{
			border-color: var(--background-color-0);
			background-color: var(--background-color-0);
			color: var(--font-color-0);
			font-size: 40rpx;
			font-weight: 600;
			&::after{
				content: "";
				border: none;
			}
		}
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
