import { baseUrl } from './url';
import { tips } from './tips';
const errHandler = (err) => {
	if (err?.data?.resp_msg) tips('错误', err?.data?.resp_msg);
	else tips('错误', '操作失败');
	return Promise.reject(err);
};
export const fetch = (method, url, params = {}, opt = {}) => new Promise((resolve, reject) => {
	wx.request({
		method,
		url: `${baseUrl}${url}`,
		data: {
			...params
		},
		success(res) {
			let data = res?.data?.datas;
			if (data && typeof data === 'object') {
				data.resCode = res?.data?.resp_code;
				data.resMsg = res?.data?.resp_msg;
			} else data = {
				data,
				resCode: res?.data?.resp_code,
				resMsg: res?.data?.resp_msg
			};
			if (res.statusCode !== 200 || res?.data?.resp_code !== 200) reject(res);
			else resolve(data);
		},
		fail(err) {
			reject(err);
		},
		complete() { },
		...opt
	});
}).catch((err) => opt.errHandler ? opt.errHandler(err) : errHandler(err));
export default fetch;
