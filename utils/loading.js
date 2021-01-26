export const loading = {
  open(content = '请稍后') {
    uni.showLoading({
      title: content,
      icon: 'loading',
      mask: true
    });
  },
  close() {
    uni.hideLoading();
  }
};
export default loading;