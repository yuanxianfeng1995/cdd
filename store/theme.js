import eventHub from '@/utils/event-hub';
export const setThemeMode = (data) => {
	uni.setStorageSync('themeMode', data);
	eventHub.emit('updateThemeMode', data);
};
export const getThemeMode = () => {
	return wx.getSystemInfoSync().theme;
};
export default {
	getThemeMode,
	setThemeMode
};