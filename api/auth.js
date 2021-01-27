import fetch from '../utils/fetch';
export const auth = (code) => fetch('get', `/api-app/mini/fetchSession/${code}`);
export const login = (data, errHandler) => fetch('post', '/wx/mini/login', data, { errHandler });
//获取小程序首页药材详情列表
export const getMini = (parmas) => fetch('get', `/wx/mini/index`,parmas);
//（首页面单个药材追加数量每次数量+1）添加购物车
export const cart = (parmas) => fetch('post', `/wx/mini/cart`,parmas);
//获取购物车列表
export const getCartPage = (parmas) => fetch('get', `/wx/mini/cart/page`,parmas);
//下单
export const order = (parmas) => fetch('post', `/wx/mini/order`,parmas);

//获取全部订单列表
export const getOrderPage = (parmas) => fetch('get', `/wx/mini/order/page`,parmas);


export default {
	login,
	auth,
	getMini,
	cart,
	getCartPage,
	order,
	getOrderPage
};
