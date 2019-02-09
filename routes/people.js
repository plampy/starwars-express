var express = require('express');
var router = express.Router();
var getPaged = require('../shared');
let cache = []; //irl chuck this in a real cache

/* GET people listing. */
router.get('/', async function(req, res, next) {
  let results = await getPeople();
  const sort = req.query.sortBy;
  if (sort) {
    results = orderBy(results, sort);
  }
  res.json(results);
});

async function getPeople() {
  if (cache.length) {
    return cache;
  }
  let url = 'https://www.swapi.co/api/people';
  let results = (cache = await getPaged(url));
  return results;
}

function orderBy(arr, propName) {
  const results = arr.concat();
  const sortByIntProp = propName => (l, r) => {
    const leftInt = parseInt(l[propName]),
      rightInt = parseInt(r[propName]);
    return leftInt > rightInt ? -1 : 1;
  };
  switch (propName) {
    case 'name':
      results.sort((l, r) => l.name.localeCompare(r.name));
      break;
    case 'height':
      results.sort(sortByIntProp('height'));
      break;
    case 'mass':
      results.sort(sortByIntProp('mass'));
      break;
  }
  return results;
}

module.exports = { router, getPeople };
