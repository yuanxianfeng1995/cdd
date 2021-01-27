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
    <View
      class="card"
      v-for="(item,index) in data"
      :key="index"
    >
      <view class="flex-row-space-between">
        <text>{{item.createTime}}</text>
        <text>{{item.status|format}}</text>
      </view>
      <view class="flex-row">
       <view class="flex-item"  v-for="items of item.orderDetails">
          <text>{{items.medicineName}}</text>
          <text>{{'x'+items.number}}</text>
        </view>
      </view>
      <view class="flex-row-space-between">
        <view class="flex-col">
          <text style="color:red;">￥{{item.payMoney}}</text>
        </view>
        <button
          class="cu-btn shadow-blur round"
          style="background-color:var(--background-color-main-0);color:#fff;"
        >再次购买</button>
      </view>
    </View>
  </view>
</template>

<script>
	import {getOrderPage} from '@/api/auth';
export default {
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
				{ label: '已取消', value: 3 },
      ],
			data: []
    };
  },
	async onReady() {
		console.log('onReady')
		this.$loading.open()
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
		}
  },
};
</script>

<style lang="scss" scoped>
.cur {
  color: var(--font-color-main-0);
}
.card {
  background-color: var(--background-color-0);
  margin-bottom: 20rpx;
  padding: 20rpx;
}
.flex-row{
	flex-wrap: wrap;
	margin-top: 10rpx;
}
.flex-item{
	width: 50%;
	margin-bottom: 10rpx;
	text{
		margin-right: 20rpx;
	}
}
</style>