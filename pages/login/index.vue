<template>
	<view class="login">
		<view class="content">
			<button v-if="!next" type="primary" size="mini" open-type="getUserInfo" @getuserinfo="getUserinfo" withCredentials="true">微信登陆</button>
			<button v-else type="primary" size="mini" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" @getphonenumber="getPhoneNumber" withCredentials="true">手机号</button>
		</view>
	</view>
</template>

<script>
	import {
		setUserInfo,
		getUserInfo,
		setLoginInfo
	} from '@/store/user.js';
	import {login} from '@/api/auth';
	import {tips} from '@/utils/tips.js';
	export default {
		data(){
			return {
				next: false
			}
		},
		methods:{
			getUserinfo() {
				this.login();
				this.next = true;
			},
			getPhoneNumber(val){
				const detail=val.detail;
				console.log(val)
				const data=getUserInfo();
				const parms={
					...data,
					phoneEncryptedData:detail.encryptedData,
					phoneIv:detail.iv,
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
					tips('成功', '登陆成功');
					uni.navigateTo({
					  url: '/pages/index/index',
					});
				})
			},
			login() {
				const that=this;
				wx.login({
					success(res) {
						console.log('login', res)
						var code = res.code
						if (code) {
							//发起网络请求
							// 获取微信用户信息
							wx.getUserInfo({
								success: function(val) {
									const parms={
										...val,
										code:code,
									};
									setUserInfo(parms);
								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})
						} else {
							console.log('登录失败！' + res.errMsg)
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
	  background-color: #f8f8f8;
	  @media (prefers-color-scheme: dark) {
	    background-color: #191919;
	  }
		.content{
			background-color: #FFFFFF;
			button{
				margin-left: 20rpx;
			}
		}
	}
</style>
