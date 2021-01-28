<template>
	<view class="order-list">
		<View
		  class="card"
		  v-for="(item,index) in data"
		  :key="index"
		>
		  <view class="flex-row-space-between">
		    <text>{{item.createTime}}</text>
		    <text>{{item.status|format}}</text>
		  </view>
		  <view class="flex-row">
		   <view class="flex-item"  v-for="items of item.orderDetails">
		      <text>{{items.medicineName}}</text>
		      <text>{{'x'+items.number}}</text>
		    </view>
		  </view>
		  <view class="flex-row-space-between">
		    <view class="flex-col">
		      <text style="color:red;">￥{{item.payMoney}}</text>
		    </view>
		    <button
				   @click="ok(item)"
		      class="cu-btn shadow-blur round"
		      style="background-color:var(--background-color-main-0);color:#fff;"
		    >再次购买</button>
		  </view>
	</view>
</template>

<script>
	export default {
		props:{
			data: {
				type: Array,
				default: [],
			},
		},
		methods:{
			ok(val){
				this.$emit('ok',val)
			}
		}
	}
</script>

<style scoped>
	.cur {
	  color: var(--font-color-main-0);
	}
	.card {
	  background-color: var(--background-color-0);
	  margin-bottom: 20rpx;
	  padding: 20rpx;
	}
	.flex-row{
		flex-wrap: wrap;
		margin-top: 10rpx;
	}
	.flex-item{
		width: 50%;
		margin-bottom: 10rpx;
		text{
			margin-right: 20rpx;
		}
	}
</style>
