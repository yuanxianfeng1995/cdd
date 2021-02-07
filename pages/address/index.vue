<template>
	<Container style="padding-top: 50rpx;" tabbar title="新增地址">
		<view class="address">
			<form @submit="formSubmit">
				<view class="form-item addr">
					<text>收货地址</text>
					<uni-data-picker :localdata="items" popup-title="请选择地址" @change="onchange"></uni-data-picker>
				</view>
				<view class="form-item">
					<text>详细地址：</text>
					<input name="address" type="text" />
				</view>
				<view class="address-footer">
					<button class="primary-btn" form-type="submit">保存地址</button>
				</view>
			</form>
		</view>
	</Container>
</template>

<script>
	import {getDict} from "@/api/auth.js"
	import response from "@/api/response.js"
	import UniDataPicker from "@/components/uni-data-picker/uni-data-picker.vue"
	export default {
		components: {
			UniDataPicker
		},
		data() {
			return {
				items: response,
				modol: {},
				deliveryTypeList: []
			}
		},
		created(){
			getDict('delivery_type').then(({data})=>{
				console.log('getDict delivery_type',data)
				this.deliveryTypeList=data.data||[];
			})
		},
		methods: {
			formSubmit(e) {
				const data = e.detail.value;
				console.log(data,this.modol)
				if(data.address&&this.modol.addressArea){
				const obj = {
					...this.modol,
					...data,
				};
				this.$tips('成功','地址保存成功');
				this.$store.setAddrsInfo(obj);
				uni.navigateBack();
				}else{
					this.$tips('提示','请填写地址数据');
				}
			},
			onchange(e) {
				const data = e.detail.value;
				console.log('onchange', e)
				this.modol = {
					addressProvince: data[0].text,
					addressCity: data[1].text,
					addressArea: data[2].text,
				}
			},
			onnodeclick(e) {
				console.log(e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		width: 90%;
		margin: 0 auto;

		.form-item {
			text {
				font-size: 32rpx;
				margin-bottom: 10rpx;
				display: inline-block;
			}

			input {
				border: 1rpx solid #e5e5e5;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				font-size: 14px;
				height: 40px;
				line-height: 38px;
				padding:0 5px;
			}
		}
		.address-footer{
			margin-top: 10px;
		}
	}
</style>
