<template>
	<Container title="资质审核">
		<view class="qualifications">
			<form @submit="formSubmit">
				<view class="form-item">
					<text>商户名称</text>
					<input class="uni-input" type="text" name="name" />
				</view>
				<view class="form-item">
					<text>联系人</text>
					<input name="contactPer" type="text" />
				</view>
				<view class="form-item">
					<radio-group name="gender">
						<label class="radio-first">
							<radio value="1" style="transform:scale(0.7);" /><text>男</text>
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
					<uni-data-picker :localdata="items" popup-title="请选择班级" @change="onchange" @nodeclick="onnodeclick"></uni-data-picker>
				</view>
				<view class="form-item">
					<text>上传照片</text>
					<ImgUpload ref="imgUpload"></ImgUpload>
				</view>

				<view class="uni-btn-v">
					<button form-type="submit">确定</button>
					<button type="default" form-type="reset">返回</button>
				</view>
			</form>

		</view>
	</Container>
</template>

<script>
	import ImgUpload from "@/components/img-upload"
	import UniDataPicker from "@/components/uni-data-picker/uni-data-picker.vue"
	export default {
		components: {
			ImgUpload,
			UniDataPicker
		},
		data() {
			return {
				// name
				// 终端名称
				// invitationCode
				// 业务员邀请码(扫码进来注册时需填写）
				// address
				// 终端详细地址
				// addressProvince
				// 终端省
				// addressCity
				// 终端市
				// addressArea
				// 终端区
				// contactPer
				// 联系人
				// gender
				// 性别
				// merchantPhone
				// 商户联系号码
				// photoUrls
				// 营业执照等照片 多张已逗号隔开
				items: [{
						text: "一年级",
						value: "1-0",
						children: [{
								text: "1.1班",
								value: "1-1"
							},
							{
								text: "1.2班",
								value: "1-2"
							}
						]
					},
					{
						text: "二年级",
						value: "2-0"
					},
					{
						text: "三年级",
						value: "3-0"
					}
				],
				modol: {
					address: null,
					addressProvince: null,
					addressCity: null,
					addressArea: null,
				},
				text: null
			}
		},
		methods: {
			onchange(e) {
				console.log(e)
			},
			onnodeclick(e) {
				console.log(e)
			},
			addr() {
				const that = this;
				if (that.text) return;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						that.modol = {
							address: res.street,
							addressProvince: res.province,
							addressCity: res.city,
							addressArea: res.district,
						}
						that.text = res.province + res.city + res.district + res.street
						console.log(res)
					}
				});
			},
			formSubmit(e) {
				let imgList = this.$refs.imgUpload.getData();
				let formdata = e.detail.value;
				console.log(this.$store.getUserInfo(), this.$store.getLoginInfo(), formdata)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qualifications {
		padding: 20rpx;

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
				border: 1rpx solid #dae0d8;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
			}
		}

		.addr {
			display: flex;
			align-items: center;

			text {
				margin-right: 30rpx;
			}
		}
	}
</style>
