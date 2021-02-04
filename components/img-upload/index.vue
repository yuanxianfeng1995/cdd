<template>
	<view class="img-upload">
		<view class="add-take-item-uploader">
			<view class="my-up-loader my-camera-up-loader" :class="{'select-img':item}" v-for="(item,index) in fileList" :key="index"
			 @click="select(index)">
				<view class="my-up-loader-content">
					<image v-show="item" :src="item" />
					<view class="cu-load loading" v-if="loadingIndex===index"></view>
					<text v-else>+</text>
					<view class="close-img" v-if="item" @click.stop="fillDelete(index)">
						+
					</view>
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
				fileList: [null, null, null, null, null, null],
				loadingIndex: null
			}
		},
		methods: {
			getData() {
				return this.fileList.filter(item => !!item).map(item => {
					let arr = item.split('http://static.llczf.com');
					return arr[1]
				})
			},
			fillDelete(index) {
				this.$set(this.fileList,index,null)
			},
			select(index) {
				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.loadingIndex = index;
						console.log('chooseImageRes', chooseImageRes)
						if(tempFilePaths[0].indexOf('png')!==-1||tempFilePaths[0].indexOf('jpg')!==-1||tempFilePaths[0].indexOf('jpeg')!==-1){
							if(chooseImageRes.errMsg==="chooseImage:ok"){
								uni.uploadFile({
									url: 'http://api.llczf.com/api-file/file/upload/cdd',
									filePath: tempFilePaths[0],
									name: 'file',
									success: ({
										data
									}) => {
										console.log('uploadFile', data)
										const val = JSON.parse(data);
										that.loadingIndex = null;
										that.$set(that.fileList, index, imgUrl + val?.datas?.url)
									},
									fail: (e) => {
										that.loadingIndex = null;
										that.$tips('错误', e);
									},
								});
							}
						}else{
							that.$tips('错误', '上传图片只能是 JPG、JPEG、PNG 格式!');
							that.loadingIndex = null;
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
		flex-wrap: wrap;

		.my-up-loader {
			width: 30%;
			height: 80px;
			margin: 0 8px 8px 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.my-up-loader-content {
				width: 80px;
				height: 80px;
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34px;
				background-color: var(--background-color-1);
				color: var(--background-color-0);
				position: relative;
			}

			.loading {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 2;
				line-height: 80px;

				&::before {
					color: var(--background-color-0);
				}

				&::after {
					content: '';
				}
			}

			image {
				position: absolute;
				top: 0;
				left: 0;
				max-width: 100%;
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
