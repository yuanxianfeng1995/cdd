import Vue from 'vue'
Vue.filter('format', (value) => {
	let data = null;
	switch (value) {
		case 0:
			data = '已下单';
			break;
		case 1:
			data = '待付款';
			break;
		case 2:
			data = '已付款';
			break;
		case 3:
			data = '已完成';
			break;
		case 4:
			data = '已过期';
			break;
		case 5:
			data = '待发货';
			break;
		default:
			data = '已发货';
	}
	return data
})


Vue.filter('returnFloat', (value) => {
	var value = Math.round(parseFloat(value) * 100) / 100;
	var xsd = value.toString().split(".");
	if (xsd.length == 1) {
		value = value.toString() + ".0";
		return value;
	}
	if (xsd.length > 1) {
		return value;
	}
})
