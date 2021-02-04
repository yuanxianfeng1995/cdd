<template>
	<Container style="padding-top: 100rpx;"  title="登录">
		<view class="login" :style="[{backgroundColor:'var(--background-color-1)'}]">
			<view class="content">
				<button type="primary" size="mini"  open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"
				 @getphonenumber="getPhoneNumber" withCredentials="true">授权登录</button>
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
			}
		},
		methods: {
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
				that.$loading.open()
				login({
					"code": parms.code,
					"rawData": parms.rawData,
					"signature": parms.signature,
					"encryptedData": parms.encryptedData,
					"iv": parms.iv,
					"phoneEncryptedData": parms.phoneEncryptedData,
					"phoneIv": parms.phoneIv,
				}).then((res) => {
					if(res.resCode===0){
						that.$tips('成功',res.resMsg);
						console.log('login', res)
						setLoginInfo(res.data.data)
						that.$loading.close()
						that.$tips('成功', '登陆成功');
						uni.navigateTo({
							url: '/pages/index/index',
						});
					}else{
						that.$tips('失败',res.resMsg);
					}
				}).finally((e)=>{
					that.$loading.close()
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
