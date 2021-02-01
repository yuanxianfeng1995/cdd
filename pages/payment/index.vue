<template>
	<Container style="padding-top: 50rpx;" :title="orderData.title||'已下单'" :style="[{backgroundColor:'var(--background-color-1)'}]">
		<view class="place-an-order">
			<view class="addr">
				<text>地址</text>
				<view class="select">{{text}}</view>
			</view>
			<List :data="orderData.orderDetails||[]"></List>
			<view class="dh-text">
				<view class="content-text">订单编号：{{orderData.dh}}</view>
				<view class="content-text">交易号：    {{orderData.payNo||''}}</view>
				<view class="content-text">创建时间：{{orderData.createTime}}</view>
				<view class="content-text">完成时间：{{orderData.updateTime}}</view>
			</view>
			
			<view class="flex-row-space-between" style="z-index:2;box-shadow:var(--box-shadow-0);background-color:var(--background-color-0);padding:20rpx;position:fixed;bottom: calc(env(safe-area-inset-bottom) / 2);width:100%;">
				<view>
					<text>订单金额</text>
					<text style="color:red;" v-if="orderData.totalMoney">￥{{orderData.totalMoney}}</text>
				</view>
				<button @click="ok"  class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">联系客服</button>
			</view>
		</view>
	</Container>
</template>

<script>
	import {
		order,
	} from '@/api/auth';
	import List from '@/pages/shopping-cart/components/list.vue';
	export default {
		components: {
			List
		},
		data() {
			return {
				modol: {},
				tmplIds: []
			}
		},
		computed:{
			orderData(){
				console.log('this.$store.getOrder()',this.$store.getOrder())
				return this.$store.getOrder()||{}
			},
			text(){
				const data=this.$store.getAddrsInfo();
				return data?data.addressProvince+data.addressCity+data.addressArea+data.address:null;
			}
		},
		methods: {
			ok() {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.place-an-order {
		.addr {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			margin-left: 20rpx;
			text {
				margin-right: 30rpx;
				margin-bottom: 0;
			}
		}
		.dh-text{
			margin-top: 30px;
		}
		.content-text{
			margin-top: 10px;
			margin-left: 20rpx;
		}
	}
</style>
