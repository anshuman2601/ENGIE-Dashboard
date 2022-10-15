import Data from "/data/index.js"

function main(){

  postJson("/main", {name: "Main Natural Gas"}).then(data => {
    console.log(data)
  })

}

function checkFetch(file, response){
  if (!response.ok) {
      if(response.status == 404){
        throw Error("Can't find " + file);
      }
      throw Error(response.statusText);
  }
  return response;

}


export async function getJson(route) {

  return fetch(route, {
    form : 'body=' + JSON.stringify({}),
    method: 'post',
    mode: 'cors'
 }).then(r => checkFetch(route, r)).then(r => r.json());
}

async function postJson(route, data) {

  return fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(r => r.json());
}

/*
export async function postJson(route, data) {

  return fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}



*/



window.onload = main;
