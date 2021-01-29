<template>
	<view class="address">
		<view class="form-item addr">
			<text>收货地址</text>
			<picker @change="bindPickerChange" :value="array" mode=region>
				<view class="uni-input">{{array[index]}}</view>
			</picker>
			<view class="addr-select" @click="addr">点击选择</view>
		</view>
		<view class="form-item">
			<text>详细地址：</text>
			<input name="contactPer" type="text" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: []
			}
		},
		methods: {
			bindPickerChange(data) {
				console.log(data)
			}
		}
	}
</script>

<style>
</style>
