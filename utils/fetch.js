import {
	baseUrl
} from './url';
import {
	tips
} from './tips';
const errHandler = (err) => {
	if (err?.data?.msg) tips('错误', err?.data?.msg);
	else tips('错误', '操作失败');
	return Promise.reject(err);
};
export const fetch = (method, url, params = {}, opt = {}) => new Promise((resolve, reject) => {
	wx.request({
		method,
		url: `${baseUrl}${url}`,
		header: {
			'Accept': 'application/json, text/plain, */*',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
			'Content-Type': 'application/json',
			'Tenantid': '1',
			'Appid': 'wx0f05a5f148707c12',
			'Thrid-session': 'vgfgf'
		},
		data: {
			...params
		},
		success(res) {
			let data = {
				data:res?.data,
				resCode: res?.data?.code,
				resMsg: res?.data?.msg
			};
			if (res.statusCode+'' !== '200' || (res?.data?.code+'') !== '0') reject(res);
			else resolve(data);
		},
		fail(err) {
			reject(err);
		},
		complete() {},
		...opt
	});
}).catch((res) => {
	if (res.statusCode+'' !== '200' || (res?.data?.code+'')!== '0') {
		opt.errHandler ? opt.errHandler(res) : errHandler(res)
	}
});
export default fetch;
