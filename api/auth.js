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
//终端小程序提交资质审核
export const pharmacySave = (parmas) => fetch('post', `/wx/mini/pharmacy/save`, parmas);
//终端绑定业务员
export const pharmacyBind = (parmas) => fetch('post', `/wx/mini/pharmacy/bind`, parmas);

//获取终端详情
export const getPharmacy = (val) => fetch('get', `/wx/mini/pharmacy/${val}`);

//获取订阅消息模板消息ID列表
export const getSubscribe = (parmas) => fetch('get', `/wx/wxmini/subscribe`, parmas);
//获取业务员邀请码小程序二维码
export const getBusiness = (val) => fetch('get', `/wx/mini/business/${val}`);
//业务员小程序获取终端列表
export const getPharmacyList = (val) => fetch('get', `/wx/mini/pharmacy/list/${val}`);


export default {
	getDict,
	login,
	auth,
	getMini,
	cart,
	getCartPage,
	order,
	getOrderPage,
	wxminiSync,
	pharmacyBind,
	pharmacySave,
	getSubscribe,
	getBusiness,
	getPharmacy
};
