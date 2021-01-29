<template>
	<Container style="padding-top: 100rpx;" tabbar :is-back="false" title="购物车">
		<view :style="style" class="shopping-cart">
			<Empty v-if="data&&data.length===0"></Empty>
			<template v-else >
				<view class="header-btn" @click="changeStatus">{{name}}</view>
				<List :data="data" :mode="mode" ref="list"></List>
			</template>
			
			<view class="flex-row-space-between" style="z-index:2;box-shadow:var(--box-shadow-0);background-color:var(--background-color-0);padding:20rpx;position:fixed;bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);width:100%;">
				<view>
					<text>合计</text>
					<text style="color:red;">￥{{totalMoney}}</text>
				</view>
				<button @click="ok" class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">{{name2}}</button>
			</view>
		</view>
	</Container>
</template>

<script>
	import {
		getCartPage,
		order
	} from '@/api/auth';
	import List from './components/list.vue';
	import Empty from '@/components/empty';
	export default {
		components: {
			List,
			Empty
		},
		data() {
			return {
				data: [],
				totalMoney: null,
				mode: 'add'
			}
		},
		computed: {
			style() {
				return `margin-top:-${this.CustomBar}rpx;  padding-bottom: calc(env(safe-area-inset-bottom) / 2 + 100rpx);`;
			},
			name() {
				return this.mode === "add" ? "编辑" : this.mode === "edit" ? "完成" : "";
			},
			name2() {
				return this.mode === "add" ? "结算" : this.mode === "edit" ? "删除" : this.mode === "check" ? "下单" : "联系客服";
			}
		},
		async onReady() {
			console.log('onReady')
			this.$loading.open()
			this.getCartPage()
		},
		methods: {
			changeStatus() {
				this.mode = this.mode === "add" ? "edit" : this.mode === "edit" ? "check" : "add";
				console.log('changeStatus', this.mode)
			},
			ok() {
				switch (this.mode) {
					case "add":
						this.mode = "check";
						break;
					case "edit":
						this.$refs.list.delete()
						break;
					case "check":
					  // this.requestSubscribeMessage()
						this.order()
						break;	
				}
			},
			requestSubscribeMessage(){
				console.log('requestSubscribeMessage')
				uni.requestSubscribeMessage({
				  tmplIds: [''],
				  success (res) {
						console.log('requestSubscribeMessage',res)
						this.order()
					},
					fail (e) {
						console.log(e)
					},
				})
			},
			order(){
				let data=this.$refs.list.getData();
				let userInfo=this.$store.getLoginInfo()?.data;
				console.log(userInfo)
				let parms={
					"userId": userInfo.userId,
					"userType": userInfo.userType,
					"orderDetails": data.map(item=>{
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
				order(parms).then(({data})=>{
					console.log(data)
					this.mode = "customer ";
				})
			},
			getCartPage() {
				const that = this;
				let data = that.$store.getLoginInfo()?.data;
				getCartPage({
					userType: data.userType,
					userId: data.userId,
					pageNo: 1,
					pageSize: 10,
				}).then(({data}) => {
					console.log(data)
					that.data = data?.data?.list?.cartDetails|| [];
					that.totalMoney = data?.data?.list?.totalMoney;
					console.log(that.data)
					that.$loading.close()
				}).finally((res) => {
					that.$loading.close()
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.header-btn {
		text-align: right;
		z-index: 9;
	}

	.shopping-cart {
		padding-top: 60rpx;
	}
</style>
