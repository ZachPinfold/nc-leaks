// exports.formatDates = (list) => {
//   const arrayCopy = list.map((item) => ({ ...item }));
//   const result = arrayCopy.map((item) => {
//     let timestamp = item.created_at;
//     let toDate = new Date(timestamp).getDate();
//     let toMonth = new Date(timestamp).getMonth() + 1;
//     let toYear = new Date(timestamp).getFullYear();
//     let newDate = toMonth + "/" + toDate + "/" + toYear;
//     delete item.created_at;
//     item.created_at = newDate;
//     return item;
//   });
//   return result;
// };

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
