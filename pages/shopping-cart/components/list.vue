<template>
	<view class="shopping-cart-list">
		<view class="header-btn">
			<view @click="changeStatus">{{name}}</view>
		</view>
		<view class="card" v-for="(item,index) in list" :key="index">
			 <label class="radio" v-if="mode==='edit'" style="margin-right: 20rpx;"><radio :checked="item.radio" @click="setRadio(index)"/></label>
			 <view class="card-content">
				 <text style="font-size:32rpx;">{{item.medicineName}}</text>
				 <view class="flex-row-space-between">
				 	<view class="flex-1 flex-row">
				 		<text class="flex-1">{{item.equivalent}}/{{item.specifications}}</text>
				 		<text class="flex-1" style="color:red">￥{{item.price|returnFloat}}</text>
				 	</view>
				 	<view class="flex-row" style="border:1rpx solid var(--border-color-0)">
				 		<text style="padding:10rpx 30rpx;" @click="cut(index)">-</text>
				 		<input type="number" :disabled="mode!=='edit'" @blur="inputChange($event,index)" :value="item.number" style="text-align:center;width:80rpx;background-color:var(--background-color-1)" />
				 		<text style="padding:10rpx 30rpx;" @click="add(index)">+</text>
				 	</view>
				 </view>
			 </view>
		</view>
		<view class="flex-row-space-between" style="z-index:2;box-shadow:var(--box-shadow-0);background-color:var(--background-color-0);padding:20rpx;position:fixed;bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);width:100%;">
			<view>
				<text>合计</text>
				<text style="color:red;" >￥{{totalMoney|returnFloat}}</text>
			</view>
			<button @click="ok" v-if="data.length!==0" class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">{{name2}}</button>
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
			money: [String,Number]
		},
		data(){
			return {
				list: [],
				mode: "preview"
			}
		},
		created() {
			this.list=this.data.map((item,index)=>{
				return {
					...item,
					radio: false
				}
			});
			this.totalMoney=this.money;
		},
		computed: {
			name() {
				return this.mode === "preview" ? "编辑" : this.mode === "edit" ? "完成" : ""
			},
			name2() {
				return this.mode === "preview" ? "结算" : this.mode === "edit" ? "删除" : "结算"
			},
		},
		watch:{
			data(val){
				this.list=this.data.map((item)=>{
					return {
						...item,
						radio: false
					}
				})
				console.log(this.list)
			},
		},
		methods:{
			changeStatus(){
				if(this.mode==='edit'){
					this.formData();
					this.mode='preview';
				}else{
					this.mode='edit';
				}
			},
			ok() {
				switch (this.mode) {
					case "preview":
					  this.$store.setOrder({orderDetails:this.list,totalMoney:this.totalMoney});
						uni.navigateTo({
							url: '/pages/place-an-order/index',
						})
						break;
					case "edit":
						this.formData();
						break;	
				}
			},
			formData(){
				this.list=this.list.filter((item)=>!item.radio)
				console.log('this.list',this.list)
				this.totalMoney=this.list.length>0?this.list.map(item=>item.number*item.price).reduce((a,b)=>{
					return a+b
				}):0
			},
			cut(index){
				if(this.mode!=='edit') return;
				this.list[index].number=this.list[index].number-1;
				if(this.list[index].number<=0){
					this.list.splice(index,1)
				}
			},
			add(index){
				if(this.mode!=='edit') return;
				this.list[index].number=this.list[index].number+1;
				this.totalMoney=this.list.length>0?this.list.map(item=>item.number*item.price).reduce((a,b)=>{
					return a+b
				}):0
			},
			inputChange(e,index){
				console.log('inputChange',e)
				if(this.mode!=='edit') return;
				this.list[index].number=e.detail.value;
				this.totalMoney=this.list.length>0?this.list.map(item=>item.number*item.price).reduce((a,b)=>{
					return a+b
				}):0
			},
			setRadio(index){
				this.list[index].radio=!this.list[index].radio;
			}
		}
	}
</script>

<style scoped>
	.card {
	  background-color: var(--background-color-0);
	  margin-bottom: 20rpx;
	  padding: 20rpx;
		display: flex;
		align-items: center;
	}
	.header-btn {
		z-index: 9;
		text-align: right;
		margin-bottom: 10px;
	}
	.card-content{
		flex: 1;
	}
</style>
