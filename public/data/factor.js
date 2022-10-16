const factors = {
    naturalGas: 53.0611, //kg
    pellets: (31875 + 32 + 4.2 + 67947.75)/1000, //g -> kg
    coal: (9328+11+1.6)/1000, // g -> kg
    oat: (32+4.2+118170)/1000
}

console.log(factors)

export default function factor(arr, type){
  const ratio = factors[type];
  const factoredData = {};


  for(const [day, result] of Object.entries(arr)){

    factoredData[day] = result*ratio;
  }
  return factoredData;
}
