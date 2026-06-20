export const addItem = (data, item) => [...data, item];
export const filterItems = (data, key) => data.filter(d => d.name.tiLowerCase().includes(key.toLowercase()));