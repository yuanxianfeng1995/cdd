<template>
	<view  class="shopping-cart">
		<template v-if="data&&data.length===0">
			<Empty></Empty>
			<view class="no-login" v-if="!userId">
				<text>登录才能查看你的购物车哦</text>
				<button class="primary-btn" open-type="getUserInfo" @getuserinfo="login" withCredentials="true">登录</button>
			</view>
		</template>
		<template v-else >
			<List :data="data" :money="totalMoney" ref="list" @ok="ok"></List>
		</template>
	</view>
</template>

<script>
	import {
		getCartPage,
	} from '@/api/auth';
	import List from './components/list.vue';
	import Empty from '@/components/empty';
	export default {
		components: {
			List,
			Empty
		},
		data() {
			return {
				data: [],
				totalMoney: null
			}
		},
		computed: {
			userId(){
			  return this.$store.getLoginInfo()?.userId
			},
		},	
		async onReady() {
			console.log('onReady')
			this.$loading.open();
			await this.getCartPage();
			uni.$on('show',(val)=>{
				this.getCartPage();
			})
		},
		methods: {
			login(val) {
				const that = this;
				const id=this.userId;
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
			getCartPage() {
				const that = this;
				let data = this.$store.getLoginInfo();
				if(!(data&&data.userId)) {
					that.$loading.close()
					return
				};
				getCartPage({
					userType: data.userType,
					userId: data.userId,
					pageNo: 1,
					pageSize: 10,
				}).then(({data}) => {
					console.log(data)
					that.data = data?.data?.list?.cartDetails|| [];
					that.totalMoney = data?.data?.list?.totalMoney;
					console.log(that.data)
					that.$loading.close()
				}).finally((res) => {
					that.$loading.close()
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.shopping-cart {
		position: absolute;
		top: 60px;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 9;
		padding-top: 60rpx;
	}
	.no-login{
		background-color: --background-color-main-1;
		text-align: center;
		margin-top: 20px;
		font-size: 32rpx;
		text{
			font-size: 34rpx;
			color: #666;
		}
		.primary-btn{
			width: 200px;
			margin: 10px auto 0 auto;
		}
	}
</style>
