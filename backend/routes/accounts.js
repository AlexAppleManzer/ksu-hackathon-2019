const express = require('express');
const router = express.Router();
const config = require('../config');
const http = require('request-promise')

const endpoint = `${config.incomm.endpoint}accounts/`

router.get('/:id', async (req, res) => {
  const result = await http.get(`${endpoint}${req.params.id}`);
  if(!result){
    res.status(404);
    return;
  }
  res.status(200).json({id: result.id, balance: result.balance, Owner: result.Owner});
});

router.delete('/:id', async (req, res) => {
  await http.delete(`${endpoint}${req.params.id}`)
  res.status(204).send();
}); 

router.post('/', async (req, res) => {
  const result = await http.post(endpoint);
  return res.status(201).json({id: result.id, name: result.balance})
})

router.get('/', async (req, res) => {
  const query = await http.get(endpoint);
  if(!query) {
    res.status(500);
    return;
  }
  return res.status(200).json(query);
});

router.put('/updateOwner/:id', async (req, res) => {
  const result = await http.put(endpoint + "updateOwner/" + req.params.id, {
    body: {
      balance: req.body.balance
    }
  });
  
  res.status(200).json(result);
});

router.put('/updateBalance/:id', async (req, res) => {
  const result = await http.put(endpoint + "updateBalance/" + req.params.id, {
    body: {
      balance: req.body.balance
    }
  });
  
  res.status(200).json(result);
});

module.exports = router;
