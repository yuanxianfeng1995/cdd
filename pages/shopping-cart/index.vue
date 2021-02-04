<template>
	<view  class="shopping-cart">
		<Empty v-if="data.length===0"></Empty>
		<template v-else >
			<List :data="data" :money="totalMoney" ref="list" @ok="ok"></List>
		</template>
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
				totalMoney: null
			}
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
