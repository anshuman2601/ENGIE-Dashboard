export default function handle(arr){
    const length = arr.length;
    const handledData = {};
    const mainCol = arr[0][0];

    for(let i = 3; i < length; i++){
      const row = arr[i];
      const result = row[mainCol]?.result;

      handledData[new Date(row[0]).toString().slice(0, -42)] = result;
    }
    return handledData;

}
