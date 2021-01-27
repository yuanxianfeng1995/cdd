<template>
	<Container style="padding-top: 100rpx;" v-model="current" tabbar :is-back="false" :shoppingCartCount="shoppingCartCount" :style="[{backgroundColor:'var(--background-color-1)'}]">
		<view slot="action">
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					<text class="text" style="padding-right:16rpx">
						{{index>-1?picker[index]:'选择客户'}}
					</text>
					<Arrow style-inner="border-color:#fff;border-width: 4rpx 4rpx 0 0;" :size="20" />
				</view>
			</picker>
		</view>
		<template v-if="current==='home'">
			<view class="cu-bar search fixed" :style="[{top:CustomBar + 'px',backgroundColor:'var(--background-color-0)'}]">
				<view class="search-form round">
					<text class="cuIcon-search" style="color:var(--font-color-1)"></text>
					<input type="text" placeholder="请输入药材名称/拼音缩写" confirm-type="search" style="background-color:transparent;color:var(--font-color-0)" />
				</view>
				<view class="action">
					<button class="cu-btn shadow-blur round" style="background-color:var(--background-color-main-0);color:#fff;">搜索</button>
				</view>
			</view>
			<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)',backgroundColor:'var(--background-color-1)'}]"
			 :scroll-with-animation="true" :enable-back-to-top="true">
				<block v-for="(item,index) in list" :key="index">
					<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
						<view class="padding">{{item.name}}</view>
						<view class="cu-list menu-avatar no-padding">
							<view class="cu-item" v-for="(items,sub) in item.data" :key="sub">
								<view class="cu-avatar round lg">{{items.name?items.name.charAt(0):''}}</view>
								<view class="content">
									<view class="content-left"><text>{{items.name}}</text>
										<text>{{items.equivalent}}/{{items.specifications}}</text>
										<text>￥{{items.price}}</text>
									</view>
									<image @click="addShoppingCart(items)" src="data:image/png;base64,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" />
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
			<view class="index-bar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
				<view class="index-bar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
					<view class="index-bar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">
						{{item.name}}</view>
				</view>
			</view>
			<!--选择显示-->
			<view v-show="!hidden" class="index-toast">
				{{listCur}}
			</view>
		</template>
		<Mine v-else-if="current==='mine'" />
		<ShoppingCart v-else-if="current==='shopping-cart'" />
		<Track v-else-if="current==='track'" />
	</Container>
</template>

<script>
	import Arrow from '@/components/arrow';
	import Mine from '../mine';
	import Track from '../track';
	import ShoppingCart from '../shopping-cart';
	import {getMini} from '@/api/auth';
	import {getLoginInfo} from '@/store/user.js';
	export default {
		components: {
			Arrow,
			Mine,
			ShoppingCart,
			Track,
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				current: 'home',
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				index: 0,
				picker: [
					'千金大药房 (保利麓谷林语店)',
					'千金大药房 (梅溪湖店)',
					'千金大药房 (尖山湖店)',
				],
				shoppingCartCount: 0
			};
		},
		async onLoad() {
		},
		async onReady() {
			await this.authorize();
			await this.getMini();
			let that = this;
			uni
				.createSelectorQuery()
				.select('.index-bar-box')
				.boundingClientRect(function(res) {
					that.boxTop = res.top;
				})
				.exec();
			uni
				.createSelectorQuery()
				.select('.indexes')
				.boundingClientRect(function(res) {
					that.barTop = res.top;
				})
				.exec();
		},
		methods: {
			async authorize() {
				const that = this;
				wx.getSetting({
					success(res) {
						console.log('getSetting', res,res.authSetting['scope.userInfo'],getLoginInfo()?.data?.token,!(res.authSetting['scope.userInfo']&&getLoginInfo()?.data?.token))
						if (!(res.authSetting['scope.userInfo']&&getLoginInfo()?.data?.token)) {
							uni.navigateTo({
								url: '/pages/login/index',
							});
						}
					}
				})
			},
			async getMini() {
				const that=this;
				if (getLoginInfo()?.data?.token) {
					getMini().then(({data}) => {
						let list=[];
						let i=0;
						let obj = data?.data||{};
						for (let [key, value,b] of Object.entries(obj)) {
							list[i] = {
								name: key,
								data: value
							};
							i++;
						}
						that.list=list;
						console.log('that.list',list)
						that.listCur = that.list[0];
					})
				}
			},
			addShoppingCart(val) {
				console.log('addShoppingCart',val)
				this.shoppingCartCount++;
			},
			PickerChange(e) {
				this.index = e.detail.value;
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur;
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name;
				}
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false;
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur;
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil((list.length * e.detail.y) / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20;
						return false;
					}
				}
			},
		},
	};
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.content-left {
		flex: 1;

		text {
			flex: 1;
		}
	}

	.picker {
		font-size: 36rpx;
		padding: 0 28rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.text {
			overflow: hidden;
			white-space: nowrap;
			color: #fff;
		}
	}

	.indexes {
		position: relative;
		padding-bottom: calc(env(safe-area-inset-bottom) / 2 + 100rpx);
	}

	.index-bar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.index-bar .index-bar-box {
		width: 40upx;
		height: auto;
		background: var(--background-color-0);
		display: flex;
		flex-direction: column;
		box-shadow: var(--box-shadow-0);
		border-radius: 10upx;
	}

	.index-bar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
	}

	movable-view.index-bar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.index-bar-item::before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.index-toast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
