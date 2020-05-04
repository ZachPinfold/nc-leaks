exports.formatDates = list => {
const arrayCopy = list.map((item) => ({ ...item }));
const result = arrayCopy.map((item) => {
    let timestamp = item.created_at
    let toDate=new Date(timestamp).getDate();
    let toMonth=new Date(timestamp).getMonth()+1;
    let toYear=new Date(timestamp).getFullYear();
    let newDate=toMonth+'/'+toDate+'/'+toYear;
    delete item.created_at
    item.created_at = newDate
    return item
})
return result
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
