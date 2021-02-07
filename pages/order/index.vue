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
		<template v-if="data&&data.length===0">
			<Empty></Empty>
			<view class="no-login" v-if="!userId">
				<text>登录才能查看你的订单哦</text>
				<button class="primary-btn" open-type="getUserInfo" @getuserinfo="login" withCredentials="true">登录</button>
			</view>
		</template>
		<List ref="orderList" :scrollNoData="scrollNoData" v-else :data="data" @ok="ok" @itemClick="itemClick" @scrollBottom="scrollBottom"></List>
	  
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
			status: 'all',
			pageNo: 1,
			scrollNoData: false,
			scroll: false
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
		userId(){
		  return this.$store.getLoginInfo()?.userId
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
		login(val) {
			const that = this;
			const id=this.$store.getLoginInfo()?.userId;
			if(id) return;
			console.log('val',val)
			if(val.detail.errMsg!=='getUserInfo:ok') {
					that.$tips('提示', '用户取消授权');
					return;
			}
			wx.login({
				success(res) {
					console.log('login', res)
					var code = res.code
					if (code) {
						//发起网络请求
						// 获取微信用户信息
						wx.getUserInfo({
							success: function(val) {
								const parms = {
									...val,
									code: code,
								};
								that.$store.setUserInfo(parms);
								uni.navigateTo({
									url: '/pages/login/index',
								});
							},
							fail: res => {
								that.$tips('提示', '用户取消授权');
							}
						})
					} else {
						that.$tips('失败', '登录失败！');
					}
				}
			})
		},
		getDict(){
			getDict('order_status_type').then(({data})=>{
				console.log('getDict',data)
			})
		},
		scrollBottom(next){
			console.log('scrollBottom')
			const that=this;
			if(!that.scrollNoData){
			that.pageNo=that.pageNo+1;
			that.scroll=true;
			that.getOrderPage().then(()=>{
					next(that.scrollNoData);
			});
				return;
			}
			next();
		},
    tabSelect(value) {
			this.$loading.open();
      this.current = value;
			this.pageNo=1;
			this.scroll=false;
			this.scrollNoData=false;
			this.getOrderPage().then(()=>{
				if(this.$refs.orderList) this.$refs.orderList.setLoading(false);
			});
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
				console.log('getOrderPage',data,that.scroll)
				if(that.scroll){
					if(((data?.data?.list)||[]).length===0) {
						that.scrollNoData=true;
					}else{
						that.data.push(...data?.data?.list)
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

<style lang="scss" scoped>
	.no-login{
		background-color: --background-color-main-1;
		text-align: center;
		margin-top: 20px;
		font-size: 32rpx;
		text{
			font-size: 34rpx;
			color: #666;
		}
		.primary-btn{
			width: 200px;
			margin: 10px auto 0 auto;
		}
	}
	
</style>