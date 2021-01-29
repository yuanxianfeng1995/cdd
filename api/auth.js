import fetch from '../utils/fetch';
export const auth = (code) => fetch('get', `/api-app/mini/fetchSession/${code}`);
export const login = (data, errHandler) => fetch('post', '/wx/mini/login', data, {
	errHandler
});
//获取小程序首页药材详情列表
export const getMini = (parmas) => fetch('get', `/wx/mini/index`, parmas);
//（首页面单个药材追加数量每次数量+1）添加购物车
export const cart = (parmas) => fetch('post', `/wx/mini/cart`, parmas);
//获取购物车列表
export const getCartPage = (parmas) => fetch('get', `/wx/mini/cart/page`, parmas);

//同步订阅消息
export const wxminiSync = (parmas) => fetch('post', `/wx/wxmini/sync`, parmas);
//查询字典提货方式
export const getDict = (url,parmas) => fetch('get', `/wx/mini/dict/${url}`, parmas);
//下单
export const order = (parmas) => fetch('post', `/wx/mini/order`, parmas);
//获取全部订单列表
export const getOrderPage = (parmas) => fetch('get', `/wx/mini/order/page`, parmas);
//上传文件
export const uploadFile = (parmas) => fetch('post', '', parmas, {
	headers: {
		'Content-Type': 'multipart/form-data'
	},
	url: `http://api.llczf.com/api-file/file/upload/cdd`
});
export const getPlace = () => wx.request('json/response.json');

export default {
	getDict,
	login,
	auth,
	getMini,
	cart,
	getCartPage,
	order,
	getOrderPage,
	uploadFile,
	wxminiSync,
	getPlace
};
