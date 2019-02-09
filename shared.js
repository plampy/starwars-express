var fetch = require('node-fetch');

async function getPaged(url) {
  let results = [];
  while(url != null) {
    const response = await fetch(url);
    const json = await response.json();
    url = json.next;
    results.push(...json.results);
  }
  return results;
}

module.exports = getPaged;