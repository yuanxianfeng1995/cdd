<template>
	<uni-popup ref="popupDialog" type="dialog">
		<uni-popup-dialog title="没有登陆请登录" type="info" noBtnLeft>
			<button type="primary" size="mini" open-type="getUserInfo" @getuserinfo="getUserinfo" withCredentials="true">微信登陆</button>
			<button type="primary" size="mini" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" @getphonenumber="getPhoneNumber" withCredentials="true">手机号</button>
		</uni-popup-dialog>
	</uni-popup>
</template>

<script>
	import {
		setUserInfo,
		getUserInfo
	} from '@/store/user.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				
			}
		},
		methods: {
			getUserinfo() {
				this.authorizeBtn = false;
				this.login();
			},
			open() {
				this.$refs.popupDialog.open()
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
				this.$emit('change',parms);
				
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

<style>
</style>
