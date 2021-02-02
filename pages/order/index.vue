<template>
	<view :style="style">
		<scroll-view
			scroll-x
			class="nav fixed"
			style="background-color:var(--background-color-0)"
			:style="[{top:CustomBar + 'px'}]"
			scroll-with-animation
			:scroll-left="scrollLeft"
		>
			<view
				class="cu-item"
				v-for="(item,index) in items"
				:class="current==item.value?'cur':''"
				:key="index"
				@tap="tabSelect(item.value)"
			>
				{{item.label}}
			</view>
		</scroll-view>
		<Empty v-if="data&&data.length===0"></Empty>
		<List v-else :data="data" @ok="ok" @itemClick="itemClick" @scrollBottom="scrollBottom"></List>
	</view>
</template>

<script>
import {getOrderPage,getDict} from '@/api/auth';
import List from '@/pages/order/components/list.vue';
import Empty from '@/components/empty';
export default {
	components:{List,Empty},
	props:{
		mode: {
			type: String,
			default: 'order'
		}
	},
  data() {
    return {
      CustomBar: this.CustomBar,
      scrollLeft: 0,
      current: 'all',
      items: this.mode==='order'?[
        { label: '全部', value: 'all' },
        { label: '已下单', value: 0 },
        { label: '已发货', value: 6 },
        { label: '已完成', value: 3 },
				{ label: '已取消', value: 4 },
      ]:[
        { label: '全部', value: 'all' },
        { label: '待付款', value: 1 },
        { label: '待配送', value: 5 },
        { label: '已下单', value: 0 },
      ],
			data: [],
			status: 0,
			pageNo: 1,
			noData: false
    };
  },
	async onReady() {
		console.log('onReady')
		this.$loading.open();
		// this.getDict();
		await this.getOrderPage();
		uni.$on('show',(val)=>{
			this.getOrderPage();
		})
	},
  computed: {
		userType(){
		  return this.$store.getLoginInfo()?.userType||'1'
		},
    style() {
      return `margin-top:-${
        this.CustomBar - 100
      }rpx;  padding-bottom: calc(env(safe-area-inset-bottom) / 2 + 100rpx);`;
    },
  },
	onShow(){
		console.log('onShow')
		this.getOrderPage();
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh')
		uni.stopPullDownRefresh();
	},
  methods: {
		getDict(){
			getDict('order_status_type').then(({data})=>{
				console.log('getDict',data)
			})
		},
		scrollBottom(next){
			const that=this;
			that.pageNo=that.pageNo+10;
			that.getOrderPage().then(()=>{
					next(that.noData);
			});
		},
    tabSelect(value) {
      this.current = value;
			this.getOrderPage();
			console.log('tabSelect',value)
    },
		getOrderPage(){
			const that=this;
			let data = that.$store.getLoginInfo();
			if(!(data&&data.userId)) {
				that.$loading.close()
				return
			};
			return getOrderPage({
				userType: data.userType,
				userId: data.userId,
				status: that.current==='all'?'':that.current,
				pageNo: that.pageNo,
				pageSize: 10,
			}).then(({data})=>{
				console.log('getOrderPage',data)
				if(that.data.length>0){
					if(((data?.data?.list)||[]).length===0) {
						that.noData=true;
					}else{
						that.data.push(data?.data?.list)
					}
				}else{
					that.data=data?.data?.list||[]
				}
				console.log('getOrderPage data',that.data)
				that.$loading.close()
			}).finally((res) => {
					that.$loading.close()
				})
		},
		ok(item){
			uni.navigateTo({
				url: '/pages/place-an-order/index?dh='+item.dh,
			})
		},
		itemClick(item){
			uni.navigateTo({
				url: '/pages/payment/index?dh='+item.dh,
			})
		}
  }
};
</script>

<style scoped>
</style>