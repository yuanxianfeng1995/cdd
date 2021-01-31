<template>
	<Container style="padding-top: 50rpx;" title="核对订单">
		<view class="place-an-order">
			<view class="addr" v-if="userType==='1'">
				<text>地址</text>
				<view class="select" @click="addr">{{text?text:'点击选择'}}</view>
			</view>
			<List :data="orderData.orderDetails||[]"></List>
			<view class="content-text">配送时间：当天发货，预计次日送达。</view>
			<view class="flex-row-space-between" style="z-index:2;box-shadow:var(--box-shadow-0);background-color:var(--background-color-0);padding:20rpx;position:fixed;bottom: calc(env(safe-area-inset-bottom) / 2);width:100%;">
				<view>
					<text>订单金额</text>
					<text style="color:red;" v-if="orderData.totalMoney">￥{{orderData.totalMoney}}</text>
				</view>
				<button @click="ok"  class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">下单</button>
			</view>
		</view>
	</Container>
</template>

<script>
	import {
		order,
		getSubscribe
	} from '@/api/auth';
	import List from '@/pages/shopping-cart/components/list.vue';
	export default {
		components: {
			List
		},
		data() {
			return {
				modol: {},
				text: null,
				tmplIds: []
			}
		},
		computed:{
			orderData(){
				return this.$store.getOrder()
			},
			userType(){
			  return this.$store.getLoginInfo()?.data?.userType||'1'
			},
		},
		onShow() {
			this.getSubscribe();
			const data=this.$store.getAddrsInfo();
			console.log('onShow',this.$store.getAddrsInfo())
			this.text=data?data.addressProvince+data.addressCity+data.addressArea+data.address:null;
		},
		methods: {
			addr(){
				uni.navigateTo({
				  url: '/pages/address/index',
				});
			},
			ok() {
				console.log('this.$store.getAddrsInfo()',this.$store.getAddrsInfo())
				if(!this.$store.getAddrsInfo()){
					this.$tips('提示','请选择地址');
					return;
				}
				this.requestSubscribeMessage()
			},
			getSubscribe(){
				if (this.$store.getRequestSubscribeMessage()?.data) return;
				getSubscribe().then(({data})=>{
					console.log('data',data)
					this.tmplIds=data?.data?.map(item=>{
						return item.priTmplId
					})
				})
			},
			requestSubscribeMessage() {
				console.log('requestSubscribeMessage', this.tmplIds, this.$store.getRequestSubscribeMessage())
				const that = this;
				if (!that.$store.getRequestSubscribeMessage()?.data) {
					uni.requestSubscribeMessage({
						tmplIds: that.tmplIds,
						success(res) {
							console.log('requestSubscribeMessage', res)
							that.$store.setRequestSubscribeMessage({
								data: true
							});
							that.order()
						},
						fail(e) {
							console.log(e)
						},
					})
				} else {
					that.order()
				}
			},
			order() {
				const that = this;
				let data = that.$store.getOrder();
				let userInfo = that.$store.getLoginInfo()?.data;
				let addrsInfo = that.$store.getAddrsInfo();
				let getPharmacy=this.$store.getPharmacy();
				console.log(userInfo, addrsInfo,getPharmacy)
				let obj=that.userType+''==='1'?{
					"orderAddress": {
						"deliveryType": addrsInfo.deliveryType,
						"address": that.text,
						"receiver": addrsInfo.receiver,
						"receiverTel": addrsInfo.receiverTel,
					}
				}:{
					pharmacyId: getPharmacy?.pharmacyId
				}
				let parms = {
					"userId": userInfo.userId,
					"userType": userInfo.userType,
					...obj,
					"orderAddress": {
						"deliveryType": addrsInfo.deliveryType,
						"address": that.text,
						"receiver": addrsInfo.receiver,
						"receiverTel": addrsInfo.receiverTel,
					},
					"orderDetails": data?.orderDetails.map(item => {
						return {
							"cartDetailsId": item.cartDetailsId,
							"medicineId": item.medicineId,
							"medicineName": item.medicineName,
							"price": item.price,
							"specifications": item.specifications,
							"equivalent": item.equivalent,
							"number": item.number,
						}
					})
				}
				order(parms).then((res) => {
					if (res.resCode === 0) {
						const obj=res.data?.data;
						console.log('order',{ orderDetails:data?.orderDetails,
							dh: obj.dh,
							payNo: obj.payNo,
							createTime: obj.createTime,
							updateTime: obj.updateTime,
							totalMoney: data.totalMoney,
							})
						that.$store.setOrder(
						{ orderDetails:data?.orderDetails,
							dh: obj.dh,
							payNo: obj.payNo,
							createTime: obj.createTime,
							updateTime: obj.updateTime,
							totalMoney: data.totalMoney,
							});
							uni.navigateTo({
							  url: '/pages/payment/index',
							});
						uni.$emit('shoppingCartCount', 0);
					} else {
						that.$tips('失败', res.resMsg);
					}
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
		.content-text{
			margin-top: 10px;
			margin-left: 20rpx;
		}
	}
</style>
