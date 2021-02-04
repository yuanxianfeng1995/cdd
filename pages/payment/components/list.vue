<template>
	<view class="shopping-cart-list">
		<view class="card" v-for="(item,index) in list" :key="index">
			 <label class="radio" v-if="mode==='edit'" style="margin-right: 20rpx;"><radio :checked="item.radio" @click="setRadio(index)"/></label>
			 <view class="card-content">
				 <text style="font-size:32rpx;">{{item.medicineName}}</text>
				 <view class="flex-row-space-between">
				 	<view class="flex-1 flex-row">
				 		<text class="flex-1">{{item.equivalent}}/{{item.specifications}}</text>
<!-- 				 		<text class="flex-1" style="color:red">￥{{item.price}}</text> -->
						<text class="flex-1">{{'x'+item.number}}</text>
				 	</view>
				 	<view class="flex-row">
						<text style="color: #D9001B;">￥{{(item.price*item.number)|returnFloat}}</text>
				 	</view>
				 </view>
			 </view>
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
			mode:{
				type: String,
				default: 'add',
			},
		},
		data(){
			return {
				list: []
			}
		},
		created() {
			this.list=this.data.map((item,index)=>{
				return {
					...item,
					radio: false
				}
			})
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
			getData(){
				return this.list
			},
			delete(){
				console.log('delete')
				this.list=this.list.filter((item)=>!item.radio)
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
				console.log('add',this.list[index].number)
			},
			inputChange(e,index){
				console.log(e)
				if(this.mode!=='edit') return;
				this.list[index].number=e.detail.value;
				console.log('inputChange',this.list[index].number)
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
	.card-content{
		flex: 1;
	}
</style>
