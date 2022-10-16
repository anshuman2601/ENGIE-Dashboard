import Data from "/data/index.js"
const date = "07/30/2021"

/*
const Enums = {
  naturalGas: "Main Natural Gas"
}

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
const eContext = energyCanvas.getContext("2d");

function main(){

  Data.postJson("/main", {name: "Main Natural Gas"}).then(data => {
    Data.factor(data, "naturalGas");
    energyCircle.style.backgroundColor = "#0000";

    energyValue.innerText = 100
    Data.makeChart(date, data, eContext);
  })

}

window.onload = main;

window.onResize = function(){
  body.height = "100vh"
}
