const ALERTS_ENDPOINT = 'http://localhost:3000/alerts';

async function add(data) {
  console.log('YEAH');
  const response = await fetch(ALERTS_ENDPOINT, { // eslint-disable-line
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  console.log(response);
  const json = await response.json();
  console.log(json);
  return json;
}

async function get(token) {
  const response = await fetch(`${ALERTS_ENDPOINT}?token=${token}`); // eslint-disable-line
  const json = await response.json();
  return json;
}

function remove(data) {
  return fetch(ALERTS_ENDPOINT, { // eslint-disable-line
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
}

export default {
  add,
  get,
  remove,
};
