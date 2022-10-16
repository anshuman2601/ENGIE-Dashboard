import Data from "/data/index.js"

const cached = {
  handled: {},
  emissions: {}
};
let fetched = false;

const Enums = {
  //main purchase to fech factor
  //main generated?

  naturalGas: ["Main Natural Gas", "Oakdale Nat Gas Est."],
  pellets: ["Blr 10 Pellets"],
  coal: ["Blr 11 Pellet Blend", "Blr 11 Coal Blend"],
  oat: ["Blr 11 Oat Hulls"]




};

/*

TODO:
get all data sources needed
need to fetch each sheet on its own (could make one big fetch)

date is hard coded

from each data fetched
  -find date selected from search
  -add all values together to make first chart
  -convert type of energy by factor (Data.factor())
  -get back all the new data
  -feed it into the makeChart again
  -now should have both charts for usage of a specific data


STEP 2

using an api, the home page would just fetch the data from the api and run it same away as everything else

STEP 3

need discussion

*/

const body = document.querySelector(".u-body");

const emissionValue = document.querySelector(".u-text-5");
const energyValue = document.querySelector(".u-text-4");

const energyCircle = document.querySelector(".u-shape-2");
const emissionCircle = document.querySelector(".u-shape-1");


const searchButton = document.querySelector("#searchButton");

window.onload = async function(){
  await fetcher();
  searchButton.disabled = false;
  console.log("hi")
  searchButton.onkeydown = function(e){
    if (e.key !== "Enter") return
    const date = new Date(searchButton.value).toString().slice(0, -42);
    main(date);
  }
}


async function fetcher(){

  for (const [key, values] of Object.entries(Enums)){

    for(const value of values) {

      await Data.postJson("/main", {name: value}).then(data => {
        const handled = Data.handle(data);
        const emissions = Data.factor(handled, key);

        cached.handled[value] = handled;
        cached.emissions[value] = emissions;
      });
    }
  }

}

async function main(date){

  const emissionChart = {data:[], labels: []};
  const usageChart = {data:[], labels: []};

  energyValue.innerText = 0;
  emissionValue.innerText = 0;

  for (const [key, values] of Object.entries(Enums)){

    for(const value of values) {


      usageChart.labels.push(value);
      emissionChart.labels.push(value);

      const eValue = cached.handled[value][date];
      usageChart.data.push(eValue);

      energyValue.innerText = parseInt(energyValue.innerText) + Math.round((eValue || 0)*100)/100;
      const emValue = cached.emissions[value][date];
      emissionChart.data.push(emValue);

      emissionValue.innerText = parseInt(emissionValue.innerText) + Math.round((emValue || 0)*100)/100

    }
  }

  const eContext = document.createElement("canvas").getContext("2d");
  const emContext = document.createElement("canvas").getContext("2d");

  while(energyCircle.firstElementChild){
    energyCircle.removeChild(energyCircle.firstElementChild);
  }

  energyCircle.appendChild(eContext.canvas);

  while(emissionCircle.firstElementChild){
    console.log(emissionCircle, energyCircle)
    emissionCircle.removeChild(emissionCircle.firstElementChild);
  }

  emissionCircle.appendChild(emContext.canvas)


  Data.makeChart(usageChart, eContext);
  Data.makeChart(emissionChart, emContext);

}

window.onResize = function(){
  body.height = "100vh"
}
