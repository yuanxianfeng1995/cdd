<template>
	<Container style="padding-top: 50rpx;" title="订单" :style="[{backgroundColor:'var(--background-color-1)'}]">
		<Order class="salesman-order"></Order>
	</Container>
</template>

<script>
	import Order from '@/pages/order/index.vue'
	export default{
		components:{Order},
		data(){
			return{}
		}
	}
</script>

<style lang="scss" scoped>
	.salesman-order{
		::v-deep{
			.order-list{
				padding-bottom: 60px;
			}
		}
	}
	
</style>
