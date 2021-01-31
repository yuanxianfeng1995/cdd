<template>
	<Container style="padding-top: 100rpx;"  title="我的">
		<view class="login" :style="[{backgroundColor:'var(--background-color-1)'}]">
			<view class="content">
				<button v-if="!next" type="primary"  open-type="getUserInfo" @getuserinfo="getUserinfo" withCredentials="true">微信登陆</button>
				<button v-else type="primary"  open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"
				 @getphonenumber="getPhoneNumber" withCredentials="true">手机号</button>
			</view>
		</view>
	</Container>
</template>

<script>
	import {
		setUserInfo,
		getUserInfo,
		setLoginInfo
	} from '@/store/user.js';
	import {
		login
	} from '@/api/auth';

	export default {
		data() {
			return {
				next: false
			}
		},
		methods: {
			getUserinfo() {
				this.login();
				this.next = true;
			},
			getPhoneNumber(val) {
				console.log('getPhoneNumber',val)
				const that=this;
				const detail = val.detail;
				if(val.detail.errMsg!=='getPhoneNumber:ok') {
						that.$tips('提示', '用户取消授权');
						return;
				}
				console.log(val)
				const data = getUserInfo();
				const parms = {
					...data,
					phoneEncryptedData: detail.encryptedData,
					phoneIv: detail.iv,
				};
				setUserInfo(parms);
				login({
					"code": parms.code,
					"rawData": parms.rawData,
					"signature": parms.signature,
					"encryptedData": parms.encryptedData,
					"iv": parms.iv,
					"phoneEncryptedData": parms.phoneEncryptedData,
					"phoneIv": parms.phoneIv,
				}).then((val) => {
					console.log('login', val)
					setLoginInfo(val.data)
					that.$tips('成功', '登陆成功');
					uni.navigateTo({
						url: '/pages/index/index',
					});
				})
			},
			login() {
				const that = this;
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
									setUserInfo(parms);
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
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		@media (prefers-color-scheme: dark) {
			background-color: #191919;
		}

		.content {
		}
	}
</style>
