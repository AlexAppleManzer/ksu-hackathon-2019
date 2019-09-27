const express = require('express');
const router = express.Router();
const config = require('../config');
const http = require('request-promise')

const endpoint = `${config.incomm.endpoint}accounts/`;
const apikey = config.incomm.apiKey;

router.get('/:id', async (req, res) => {
  let result = await http.get(`${endpoint}${req.params.id}`,
  {
    headers: {'X-API-Key': apikey}
  });
  result = JSON.parse(result);
  if(!result){
    res.status(404);
    return;
  }
  res.status(200).json({id: result.id, balance: result.balance, Owner: result.Owner});
});

router.delete('/:id', async (req, res) => {
  await http.delete(`${endpoint}${req.params.id}`, {
    headers: {'X-API-Key': apikey}
  });

  res.status(204).send();
}); 

router.post('/', async (req, res) => {
  let result = await http.post(endpoint, {
    headers: {'X-API-Key': apikey}
  });

  result = JSON.parse(result);
  console.log(typeof(result));
  return res.status(201).json({id: result.id, balance: result.balance});
})

router.get('/', async (req, res) => {
  let query = await http.get(endpoint, {
    headers: {'X-API-Key': apikey},
    params: {
      
    }
  });
  query = JSON.parse(query);
  if(!query) {
    res.status(500);
    return;
  }
  return res.status(200).json(query);
});

router.put('/updateOwner/:id', async (req, res) => {
  let result = await http.put(endpoint + "updateOwner/" + req.params.id, {
    headers: {'X-API-Key': apikey},
    body: {
      balance: req.body.balance
    }
  });
  
  result = JSON.parse(result);
  res.status(200).json(result);
});

router.put('/updateBalance/:id', async (req, res) => {
  let result = await http.put(endpoint + "updateBalance/" + req.params.id, {
    headers: {'X-API-Key': apikey},
    body: {
      balance: req.body.balance
    }
  });
  
  result = JSON.parse(result);
  res.status(200).json(result);
});

module.exports = router;
