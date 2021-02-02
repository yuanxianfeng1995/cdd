<template>
	<Container title="资质审核" :style="[{backgroundColor:'var(--background-color-1)'}]">
		<view class="qualifications" :style="[{backgroundColor:'var(--background-color-0)'}]">
			<form @submit="formSubmit">
				<view class="form-item">
					<text>商户名称</text>
					<input class="uni-input" type="text" name="name" />
				</view>
				<view class="form-item">
					<text>联系人</text>
					<input name="contactPer" type="text" />
				</view>
				<view class="form-item gender">
					<radio-group name="gender">
						<label class="radio-first">
							<radio value="1"  checked="true" style="transform:scale(0.7);" /><text>男</text>
						</label>
						<label>
							<radio value="2" style="transform:scale(0.7);" /><text>女</text>
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<text>联系电话</text>
					<input name="merchantPhone" type="number" />
				</view>
				<view class="form-item addr">
					<text>地址</text>
					<view class="select" @click="addr">{{text?text:'点击选择'}}</view>
				</view>
				<view class="form-item">
					<text>上传照片</text>
					<ImgUpload ref="imgUpload"></ImgUpload>
				</view>

				<view class="foter">
					<button form-type="submit" type="primary">确定</button>
				</view>
			</form>

		</view>
	</Container>
</template>

<script>
	import ImgUpload from "@/components/img-upload"
	import {pharmacySave} from "@/api/auth"
	export default {
		components: {ImgUpload},
		data() {
			return {
				text: null
			}
		},
		onShow(){
			const data=this.$store.getAddrsInfo();
			this.text=data?data.addressProvince+data.addressCity+data.addressArea+data.address:null;
		},
		methods: {
			addr() {
				uni.navigateTo({
				  url: '/pages/address/index',
				});
			},
			formSubmit(e) {
				const imgList = this.$refs.imgUpload.getData();
				const formData = e.detail.value;
				const addrData = this.$store.getAddrsInfo();
				console.log(imgList, formData,addrData);
				const obj={
					invitationCode: '123456',
					...addrData,
					address: this.text,
					...formData,
					photoUrls: imgList.join(',')
				};
				let bon=true;
				for(let i in obj){
					if(!obj[i]){
						bon=false;
						this.$tips('提示','请补全数据')
						return;
					}
				}
				console.log(obj);
				pharmacySave(obj).then(({data})=>{
					console.log('pharmacySave',data);
					this.$store.setAddrsInfo(obj);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qualifications {
		padding: 20rpx 20rpx 20px 20rpx;

		.form-item {
			text {
				font-size: 32rpx;
				margin-bottom: 10rpx;
				display: inline-block;
			}
			
			.radio-first {
				margin-right: 30rpx;
			}

			input {
				border: 1rpx solid #e5e5e5;
				border-radius: 5px;
				margin-bottom: 10px;
				font-size: 14px;
				height: 40px;
				line-height: 38px;
				padding:0 5px;
			}
		}
		.gender{
			margin-bottom: 10px;
		}
		.addr {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			text {
				margin-right: 30rpx;
				margin-bottom: 0;
			}
		}
	}
</style>
