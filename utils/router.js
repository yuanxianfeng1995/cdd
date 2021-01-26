export const getCurrentFullPath = () => {
  const pages = getCurrentPages();
  console.log(pages);
  return pages[0]?.$page?.fullPath;
};
export const router = {
  getCurrentFullPath
};
export default router;