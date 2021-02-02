<template>
	<Container style="padding-top: 50rpx;" :title="orderData.title||'已下单'" :style="[{backgroundColor:'var(--background-color-1)'}]">
		<view class="place-an-order">
			<List :data="orderData.orderDetails||[]"></List>
			<view class="dh-text">
				<view class="content-text">订单编号：{{orderData.dh}}</view>
				<view class="content-text">交易号：    {{orderData.payNo||''}}</view>
				<view class="content-text">创建时间：{{orderData.createTime}}</view>
				<view class="content-text">完成时间：{{orderData.updateTime}}</view>
				<view class="content-text">完成时间：{{orderData.updateTime}}</view>
				<view class="content-text">配送方式：{{deliveryType}}</view>
				<view class="content-text">收货地址：{{orderData.orderAddressVO?orderData.orderAddressVO.address:''}}</view>
				<template v-if="orderData.orderAddressVO?orderData.orderAddressVO.deliveryType==='1':false">
					<view class="content-text">收货人：{{orderData.orderAddressVO?orderData.orderAddressVO.receiver:''}}</view>
					<view class="content-text">联系方式：{{orderData.orderAddressVO?orderData.orderAddressVO.receiverTel:''}}</view>
				</template>
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
		getOrderInfo,
		getDict
	} from '@/api/auth';
	import List from '@/pages/shopping-cart/components/list.vue';
	export default {
		components: {
			List
		},
		data() {
			return {
				modol: {},
				tmplIds: [],
				orderData: {}
			}
		},
		computed:{
			deliveryType(){
				let data=this.orderData?.orderAddressVO||{}
				console.log('deliveryType',this.deliveryType.find((item)=>item.value+''===data.deliveryType+''))
				return this.deliveryType.find((item)=>item.value+''===data.deliveryType+'')
			}
		},
		async onLoad(option) {
			console.log('option',option)
			await this.getDeliveryTypeList();
			await this.getOrderInfo(option.dh);
		},
		methods: {
			async getOrderInfo(dh){
				const that=this;
				if(!dh) {
					this.orderData=this.$store.getOrder()||{};
					return
				};
				that.$loading.open();
				getOrderInfo(dh).then(({data})=>{
					console.log('getOrderInfo',data);
					this.orderData=data?.data||{};
					that.$loading.open();
				}).finally((e)=>{
					that.$loading.close();
				})
			},
			async getDeliveryTypeList(){
				getDict('delivery_type').then(({data})=>{
					console.log('getDict delivery_type',data)
					this.deliveryTypeList=data.data||[];
				})
			},
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
			padding: 20px;
			background-color: var(--background-color-0);
		}
		.content-text{
			margin-top: 10px;
			margin-left: 20rpx;
		}
	}
</style>
