<template>
	<Container style="padding-top: 100rpx;" tabbar :is-back="false" title="订单">
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
			<List v-else :data="data" @ok="ok"></List>
		</view>
	</Container>
</template>

<script>
import {getOrderPage,wxminiSync,getDict} from '@/api/auth';
import List from '@/pages/order/components/list.vue';
import Empty from '@/components/empty';
export default {
	components:{List,Empty},
	filters:{
		 format:function (value){
			 let data=null;
			  switch(value){
					case 0:
					data='已下单';
					break;
					case 1:
					data='待付款';
					break;
					case 2:
					data='已付款';
					break;
					case 3:
					data='已完成';
					break;
					case 4:
					data='已过期';
					break;
					case 5:
					data='确认收款';
					break;
					default:
					data='已发货';
					}
					return data
		}
	},
  data() {
    return {
      CustomBar: this.CustomBar,
      scrollLeft: 0,
      current: 0,
      items: [
        { label: '全部', value: 0 },
        { label: '已下单', value: 1 },
        { label: '已发货', value: 2 },
        { label: '已完成', value: 3 },
				{ label: '已取消', value: 4 },
      ],
			data: [],
    };
  },
	async onReady() {
		console.log('onReady')
		this.$loading.open()
		await this.getDict()
		this.getOrderPage()
	},
  computed: {
    style() {
      return `margin-top:-${
        this.CustomBar - 100
      }rpx;  padding-bottom: calc(env(safe-area-inset-bottom) / 2 + 100rpx);`;
    },
  },
  methods: {
		getDict(){
			const that=this;
			getDict('order_status_type').then((data)=>{
				console.log(data)
				// that.items=data.map(item=>{
				// 	return {
				// 		value: item.value,
				// 		label: item.description
				// 	}
				// })
			})
		},
    tabSelect(value) {
      this.current = value;
    },
		getOrderPage(){
			const that=this;
			let data = that.$store.getLoginInfo()?.data;
			getOrderPage({
				userType: data.userType,
				userId: data.userId,
				pageNo: 1,
				pageSize: 10,
			}).then(({data})=>{
				console.log('getOrderPage',data)
				that.data=data?.data?.list;
				console.log('getOrderPage data',that.data)
				that.$loading.close()
			})
		},
		ok(){
		}
  },
};
</script>

<style scoped>
</style>