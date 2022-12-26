/* global chrome */
export const exportData = async () => {
  const data = await chrome.storage.local.get(null).then(res => res);

  return await data;
};
