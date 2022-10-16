const saved = {

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


export async function getJson(route, data) {

  return fetch(route).then(r => checkFetch(route, r)).then(r => r.json());
}

export async function postJson(route, data) {

  return fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(r => r.json());
}
