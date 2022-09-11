const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getData = (key) => {
  var data = localStorage.getItem(key);
  data = JSON.parse(data);
  return data;
};

export { saveData, getData };
