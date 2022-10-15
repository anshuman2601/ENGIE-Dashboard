const factors = {
    naturalGas: 53.0611, //kg
    pellets: (31875+32+4.2+67947.75)/1000, //g -> kg
    coal: (9328+11+1.6)/1000 // g -> kg
}


export default function factor(arr, type){
  const length = arr.length;
  const ratio = factors[type];
  const factoredData = new Array(length);
  for(let i = 0; i < 100; i++){
    factoredData[i] = arr[i][13].result*ratio;
    console.log(factoredData[i])
  }
  return factoredData;
}
