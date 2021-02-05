<template>
	<Container style="padding-top: 50rpx;" title="核对订单"  :style="[{backgroundColor:'var(--background-color-1)'}]">
		<view class="place-an-order" :style="[{backgroundColor:'var(--background-color-1)'}]">
			<view class="status-text" v-if="orderData.status||orderData.status+''==='0'">{{orderData.status|format}}</view>
			<List :data="orderData.orderDetails||[]"></List>
			<form @submit="formSubmit">
				<view class="addr-content">
					<view class="form-item">
						<text>配送时间：</text>
						<view>当天发货，预计次日送达。</view>
					</view>
					<view class="form-item">
						<text>配送方式：</text>
						<view class="gender">
							<radio-group name="deliveryType" @change="deliveryTypeChange">
								<label class="radio" v-for="(item1,index) of deliveryTypeList" :key="item1.updateTime">
									<radio :value="item1.value"  :checked="index===0" style="transform:scale(0.7);" /><text>{{item1.description}}</text>
								</label>
							</radio-group>
						</view>
					</view>
					<template v-if="checked+''==='1'">
						<view class="form-item">
							<text>收货地址：</text>
								<input name="address" type="text" :value="address"/>
						</view>
						<view class="form-item">
							<text>收货人：</text>
							<input name="receiver" type="text" :value="receiver"/>
						</view>
						<view class="form-item">
							<text>联系方式：</text>
							<input name="receiverTel" type="text" :value="receiverTel"/>
						</view>
					</template>
					<view class="form-item" v-else>
						<text>提货地点：</text>
						<picker class="form-item-picker" @change="PickerChange" :value="index" :range="pickerData">
							<view class="picker">
								<text class="text" style="padding-right:16rpx">
									{{index>-1?pickerData[index]:'点击选择'}}
								</text>
								<Arrow style-inner="border-color:#fff;border-width: 4rpx 4rpx 0 0;" :size="20" />
							</view>
						</picker>
					</view>
				</view>
				<view class="flex-row-space-between" style="z-index:2;box-shadow:var(--box-shadow-0);background-color:var(--background-color-0);padding:20rpx;position:fixed;bottom: calc(env(safe-area-inset-bottom) / 2);width:100%;">
					<view>
						<text>订单金额</text>
						<text style="color:red;" v-if="orderData.payMoney||orderData.totalMoney">￥{{(orderData.payMoney||orderData.totalMoney)|returnFloat}}</text>
					</view>
					<button  form-type="submit" class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">下单</button>
				</view>
			</form>
		</view>
	</Container>
</template>

<script>
	import {
		order,
		getSubscribe,
		getPickUp,
		getDict,
		getOrderInfo
	} from '@/api/auth';
	import List from '@/pages/payment/components/list.vue';
	import response from "@/api/response.js"
	import UniDataPicker from "@/components/uni-data-picker/uni-data-picker.vue"
	export default {
		components: {
			List,
			UniDataPicker
		},
		data() {
			return {
				items: response,
				modol: {},
				tmplIds: [],
				deliveryTypeList: [],
				checked: '1',
				index: 0,
				address: null,
				receiver: null,
				receiverTel: null,
				pickerData: [],
				pickerData2: [],
				orderAddress: {},
				orderData: {},
				title: null
			}
		},
		computed:{
			userData(){
				return this.$store.getUserInfo()
			},
			getPharmacy(){
				return this.$store.getPharmacy()
			},
			userType(){
			  return this.$store.getLoginInfo()?.userType||'1'
			},
		},
		async onLoad(option) {
			this.title=option.title;
			await this.getOrderInfo(option.dh);
			this.getSubscribe();
			this.getDeliveryTypeList();
			this.getPickUp();
			const data=this.$store.getAddrsInfo();
			const pharmacy=this.$store.getPharmacy();
			if(this.userType+''==='1'){
				this.address=data?.address;
				this.receiver=data?.address;
				this.receiverTel=data?.address;
			}else{
				this.address=pharmacy?.address;
				this.receiver=pharmacy?.name;
				this.receiverTel=pharmacy?.merchantPhone;
			}
		},
		methods: {
			async getOrderInfo(dh){
				const that=this;
				if(!dh) {
					that.orderData=this.$store.getOrder()||{};
					console.log('that.orderData',that.orderData)
					return
				};
				that.$loading.open();
				getOrderInfo(dh).then(({data})=>{
					that.orderData=data?.data||{};
					that.$loading.close();
				}).finally((e)=>{
					that.$loading.close();
				})
			},
			onchange(e) {
				const data = e.detail.value;
				this.address = data[0].text+data[1].text+data[2].text;
			},
			getPickUp(){
				getPickUp({tenantId: this.$store.getLoginInfo()?.tenantId}).then(({data})=>{
					this.pickerData2=data?.data;
					this.pickerData=data?.data.map(item=>item.address);
				})
			},
			PickerChange(e) {
				this.index = e.detail.value;
			},
			deliveryTypeChange(evt){
				this.checked=evt.detail.value;
			},
			formSubmit(e){
				const data = this.checked+''==='1'?e.detail.value:{
					...e.detail.value,
					address: this.pickerData2[this.index]?.address
				};
				this.order(data)
			},
			getDeliveryTypeList(){
				getDict('delivery_type').then(({data})=>{
					this.deliveryTypeList=data.data||[];
				})
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
				const that = this;
				if (!that.$store.getRequestSubscribeMessage()?.data) {
					uni.requestSubscribeMessage({
						tmplIds: that.tmplIds,
						success(res) {
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
			order(orderAddress) {
				const that = this;
				let data = that.$store.getOrder();
				let userInfo = that.$store.getLoginInfo();
				let addrsInfo = that.$store.getAddrsInfo();
				let getPharmacy=this.$store.getPharmacy();
				console.log(userInfo, addrsInfo,getPharmacy)
				let obj=that.userType+''==='2'?{
					pharmacyId: getPharmacy?.pharmacyId,
				}:{};
				let parms = {
					"userId": userInfo.userId,
					"userType": userInfo.userType,
					"orderAddress": orderAddress,
					...obj,
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
							uni.navigateTo({
							  url: '/pages/payment/index?dh='+obj.dh,
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
		padding-bottom: 100px;
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
		.addr-content{
			margin-top: 10px;
			padding: 20rpx;
			background-color: var(--background-color-0);
		}
		.form-item{
			display: flex;
			align-items: center;
			font-size: 30rpx;
			margin-bottom: 10px;
			>text {
				font-size: 30rpx;
				display: inline-block;
				width: 150rpx;
				text-align: right;
			}
			
			input,.selected-item {
				border: 1rpx solid #e5e5e5;
				border-radius: 10rpx;
				font-size: 30rpx;
				height: 26px;
				line-height: 26px;
				padding:0 5px;
				flex: 1;
				width: 100%;
				margin-right: 5%
			}
		}
		.form-item-picker{
			flex: 1;
			margin-right: 5%
			::v-deep{
				.input-value{
					width: 100%;
					line-height: 26px!important;
				}
			}
		}
		.status-text{
			text-align: right;
			margin-bottom: 10px;
			color: #D9001B;
		}
	}
</style>
