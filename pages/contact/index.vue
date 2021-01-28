<template>
	<view class="order-contact">
		<List :data="data"></List>
	</view>
</template>

<script>
	import List from '@/pages/order/components/list.vue';
	export default {
		components: {
			List
		},
		data(){
			return {
				data: []
			}
		}
	}
</script>

<style scoped>
	.order-contact{
		
	}
</style>
