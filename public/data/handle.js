export default function handle(arr){
    const length = arr.length;
    const handledData = {};
    const mainCol = arr[0][0];

    for(let i = 3; i < length; i++){
      const row = arr[i];
      const main = row[mainCol]?.result
      const result = !isNaN(main) && main > 0? row[mainCol]?.result : 0;
      const date = new Date(row[0]);
      date.setDate(date.getDate()+1); //because of format
      handledData[date.toString().slice(0, -42)] = result;
    }
    return handledData;

}
