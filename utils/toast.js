export const toast = {
  open(title) {
    uni.hideToast();
    uni.showToast({ title, icon: 'none' });
  },
  close() {
    // uni.hideToast();
  },
};
export default toast;