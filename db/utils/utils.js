exports.formatDates = (list) => {
      const arrayCopy = list.map((item) => ({ ...item }));
      const result = arrayCopy.map((item) => {
    let timeStamp = new Date(item.created_at)
    let str = ''
    delete item.created_at;
    item.created_at = timeStamp;
    return item;
  });
  return result;
}

exports.makeRefObj = (list, key, value) => {
  const lookupObj = {};
  list.forEach((row) => {
    lookupObj[row[value]] = row[key];
  });
  return lookupObj;
};

exports.formatComments = (shopData, lookupObj, keyToChange, keyToCreate, nextKeyToChange, newKey) => {
    const formattedShops = shopData.map((shop) => {
      const { [keyToChange]: key, ...restOfKeys } = shop;
      return { [keyToCreate]: lookupObj[key], ...restOfKeys };
    });
    const changeAuthor = formattedShops.map((shop) => {
      for (let key in shop)  {
        shop[newKey] = shop[nextKeyToChange]
        delete shop[nextKeyToChange]
        return shop
      }
    })
    return changeAuthor
  }
