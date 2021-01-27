<template>
	<view class="lnvitation-code">
		<form @submit="onSubmit">
			<view class="title">可自动聚焦的input</view>
			<input class="uni-input" focus placeholder="自动获得焦点" name="input" type="number" confirm-type="done"/>
			<button form-type="submit" size="mini" type="primary">Submit</button>
		</form>
		<!-- <form @submit="onSubmit">
			<comp-input name="test" v-model="testValue" focus></comp-input>
			<button form-type="submit">Submit</button>
		</form> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testValue: null
			}
		},
		methods: {
			onSubmit(e) {
				var formdata = e.detail.value
				console.log(formdata)
			},
		}
	}
</script>

<style lang="scss">
	.lnvitation-code {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;

		form {
			background-color: #FFFFFF;
			width: 80%;
			padding: 10rpx;
			border-radius: 10rpx;
			text-align: center;
			input{
				margin: 10rpx;
				width: 70%;
				margin-left: 20%;
				border: 1px solid #e0e0e0;
			}
			.title {
				text-align: left;
				margin-left: 10rpx;
				font-size: 30rpx;
			}
			
		}
	}
</style>
