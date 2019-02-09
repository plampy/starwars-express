var express = require('express');
var router = express.Router();
var { getPeople } = require('./people');
var getPaged = require('../shared');
let cache = []; //irl chuck this in a real cache

/* GET planets listing. */
router.get('/', async function(req, res, next) {
  let url = 'https://www.swapi.co/api/planets';
  if (cache.length) {
    return res.json(cache);
  }
  const results = await getPaged(url);
  const people = await getPeople();
  const nameMap = people.reduce((result, p) => {
    result[p.url] = p.name;
    return result;
  }, {});
  results.forEach(p => p.residents = p.residents.map(r => nameMap[r]));
  cache = results;

  res.json(results);
});

module.exports = router;
