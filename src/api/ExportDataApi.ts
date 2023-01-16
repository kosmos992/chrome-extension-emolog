export const exportData = async () => {
  const data = chrome.storage.local.get(null);

  return data;
};
