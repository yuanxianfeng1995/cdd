<template>
	<scroll-view  class="order-list" scroll-y @scrolltolower="scroll" :ower-threshold="0">
		<view class="card" v-for="(item,index) in data" :key="index" @click="itemClick(item)">
			<view class="flex-row-space-between">
				<text>{{item.createTime}}</text>
				<text>{{item.status|format}}</text>
			</view>
			<view class="flex-row">
				<view class="flex-item" v-for="items of item.orderDetails">
					<text>{{items.medicineName}}</text>
					<text>{{'x'+items.number}}</text>
				</view>
			</view>
			<view class="flex-row-space-between">
				<view class="flex-row">
					<text style="color:red;margin-right: 10px;">￥{{item.payMoney|returnFloat}}</text>
					<text v-if="item.pharmacyName">{{item.pharmacyName}}</text>
				</view>
				<button @click.stop="ok(item)" class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">再次购买</button>
			</view>
		</view>
		<view class="cu-load loading animation-scale-up" v-if="loading"></view>
		<view class="scroll-no-data" v-if="scrollNoData">我也是有底线的</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: [],
			},
			scrollNoData: {
			  type: Boolean,
				default: false,
			}
		},
		data(){
			return {
				loading: true,
				noData: false
			}
		},
		onPullDownRefresh() {
			console.log('list onPullDownRefresh')
			uni.stopPullDownRefresh();
		},
		methods: {
			setLoading(val){
				this.loading=val;
			},
			scroll(e){
				const that=this;
				if(!that.noData){
					this.loading=true;
					this.$emit('scrollBottom',(val)=>{
						that.noData=val;
						setTimeout(()=>{
							this.loading=false;
						},400)
					})
				}
			},
			itemClick(item){
				this.$emit('itemClick', item)
			},
			ok(val) {
				this.$emit('ok', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cur {
		color: var(--font-color-main-0);
	}
	.order-list{
		position: fixed;
		width: 100%;
		z-index: 2;
		padding-bottom: 161px;
		height: 100%;
		@media (prefers-color-scheme: dark) {
			background-color: #9e9e9e;
		}
	}
	.loading{
		padding-bottom: 0px;
	}
	.card {
		background-color: var(--background-color-0);
		margin-bottom: 20rpx;
		padding: 20rpx;
	}

	.flex-row {
		flex-wrap: wrap;
		margin-top: 10rpx;
	}

	.flex-item {
		width: 50%;
		margin-bottom: 10rpx;

		text {
			margin-right: 20rpx;
		}
	}
	.scroll-no-data{
		text-align: center;
		padding-bottom: 8px;
	}
</style>
