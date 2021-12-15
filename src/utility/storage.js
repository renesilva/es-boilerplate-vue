export const storageSave = (param, value) => {
  localStorage.setItem(param, value);
};

export const storageGet = (param) => {
  localStorage.getItem(param);
};

export const storageDelete = (param) => {
  localStorage.removeItem(param);
};

export default {
  storageSave,
  storageGet,
  storageDelete,
};
