<template>
	<view  class="shopping-cart">
		<Empty v-if="data.length===0"></Empty>
		<template v-else >
			<view class="header-btn">
				<view @click="changeStatus">{{name}}</view>
			</view>
			
			<List :data="data" :mode="mode" ref="list"></List>
		</template>
		
		<view class="flex-row-space-between" style="z-index:2;box-shadow:var(--box-shadow-0);background-color:var(--background-color-0);padding:20rpx;position:fixed;bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);width:100%;">
			<view>
				<text>合计</text>
				<text style="color:red;" >￥{{totalMoney||0}}</text>
			</view>
			<button @click="ok" v-if="data.length!==0" class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">{{name2}}</button>
		</view>
	</view>
</template>

<script>
	import {
		getCartPage,
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
				mode: 'preview',
				tmplIds: [],
			}
		},
		computed: {
			name() {
				return this.data&&this.data.length>0? this.mode === "preview" ? "编辑" : this.mode === "edit" ? "完成" : "":"";
			},
			name2() {
				return this.data&&this.data.length>0?this.mode === "preview" ? "结算" : this.mode === "edit" ? "删除" : "结算" :"";
			},
		},
		async onReady() {
			console.log('onReady')
			this.$loading.open();
			await this.getCartPage();
			uni.$on('show',(val)=>{
				this.getCartPage();
			})
		},
		methods: {
			changeStatus() {
				this.mode = this.mode === "preview" ? "edit"  : "preview";
				console.log('changeStatus', this.mode)
				this.setData()
			},
			setData(){
				let data=this.$refs.list.getData();
				this.data=data;
				console.log('changeStatus', data)
				this.totalMoney=data.length>0?data.map(item=>item.number*item.price).reduce((a,b)=>{
					return a+b
				}):0
			},
			ok() {
				switch (this.mode) {
					case "preview":
					  this.$store.setOrder({orderDetails:this.data,totalMoney:this.totalMoney});
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
				this.$refs.list.delete()
				this.setData();
			},
			getCartPage() {
				const that = this;
				let data = this.$store.getLoginInfo();
				if(!(data&&data.userId)) {
					that.$loading.close()
					return
				};
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
		z-index: 9;
		text-align: right;
	}
  
	.shopping-cart {
		position: absolute;
		top: 60px;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 9;
		padding-top: 60rpx;
	}
</style>
