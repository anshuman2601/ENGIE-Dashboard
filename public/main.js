import Data from "/data/index.js"

const date = new Date(" Oct 03 2021").toString().slice(0, -42)
const cached = {};

const Enums = {
  //main purchase to fech factor
  //main generated?
  naturalGas: "Main Natural Gas",
  pellets: "Blr 10 Pellets",
  coal: "Blr 11 Coal and Pellets",



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

const energyCircle = document.querySelector(".u-shape-2");
const energyCanvas = document.getElementById('energyCanvas')
const energyValue = document.querySelector(".u-text-4");

const emissionCircle = document.querySelector(".u-shape-1");
const emissionCanvas = document.getElementById('emissionCanvas')
const emissionValue = document.querySelector(".u-text-5");


const eContext = energyCanvas.getContext("2d");
const emContext = emissionCanvas.getContext("2d")

async function main(){

  const emissionChart = {data:[], labels: []};
  const usageChart = {data:[], labels: []};

  for (const [key, value] of Object.entries(Enums)){
    await Data.postJson("/main", {name: value}).then(data => {
      const handled = Data.handle(data);
      const emissions = Data.factor(handled, key);
      cached[value] = handled;

      usageChart.labels.push(value);
      usageChart.data.push(handled[date]);

      emissionChart.labels.push(value);
      emissionChart.data.push(emissions[date]);
    });
  }
  energyCircle.style.backgroundColor = "#0000";
  energyValue.innerText = 100;

  emissionCanvas.style.backgroundColor = "rgba";
  emissionValue.innerText = 200;


  Data.makeChart(usageChart, eContext);
  Data.makeChart(emissionChart, emContext);

}

window.onload = main;

window.onResize = function(){
  body.height = "100vh"
}
