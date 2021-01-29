<template>
	<view class="img-upload">
		<view class="add-take-item-uploader">
			<view class="my-up-loader my-camera-up-loader" :class="{'select-img':item}" v-for="(item,index) in fileList" :key="index"
			 @click="select(index)">
				<image v-show="item" :src="item" />
				<text>+</text>
				<view class="close-img" v-if="item" @click.stop="fillDelete(index)">
					 +
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uploadFile
	} from '@/api/auth.js'
	import {
		imgUrl
	} from '@/utils/url.js'
	export default {
		data() {
			return {
				fileList: [null, null, null,null, null, null],
			}
		},
		methods: {
			getData(){
				return this.fileList
			},
			select(index) {
				const that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log('chooseImageRes', chooseImageRes)
						uni.uploadFile({
							url: 'http://api.llczf.com/api-file/file/upload/cdd',
							filePath: tempFilePaths[0],
							name: 'file',
							success: ({data}) => {
								const val=JSON.parse(data);
								that.$set(that.fileList, index, imgUrl+val?.datas?.url)
							},
							fail: (e) => {
								that.$tips('错误', e);
							},
						});
						try {
							// let formData = new FormData;
							// formData.append('file', chooseImageRes.tempFiles[0]);
							// console.log('file', chooseImageRes.tempFiles[0])
							// uploadFile({
							// 	file: chooseImageRes.tempFiles[0]
							// }).then(({
							// 	data
							// }) => {
							// 	console.log('data',data)
							// }).catch(() => {})



						} catch (error) {
							console.log(error);
						}

					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-take-item-uploader {
		padding: 10px 16px;
		display: flex;

		.my-up-loader {
			width: 80px;
			height: 80px;
			margin: 0 8px 8px 0;
			background-color: #f7f8fa;
			border-radius: 8px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34px;
			color: #eae7e7;
			position: relative;

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 80px;
				height: 80px;
			}

			.close-img {
				position: absolute;
				right: -6px;
				top: -5px;
				width: 16px;
				height: 16px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				transform: rotate(45deg);
				font-size: 16px;
				background-color: #afa3a3;
				color: #eae7e7;
			}
		}
	}
</style>
