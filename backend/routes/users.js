var express = require('express');
var router = express.Router();
const config = require('../config');
const http = require('request-promise');

const User = require('../models/userModel');
const endpoint = `${config.incomm.endpoint}accounts/`;
const apikey = config.incomm.apiKey;

/* GET users listing. */
router.get('/', async (req, res) => {
  res.status(200).json(req.user);
});

router.post('/accounts', async (req,res) => {
  console.log(req.body)
  if(!req.body.type || !req.body.balance) {
    res.status(400).send();
    return;
  }

  let result = await http.post(endpoint,
    {
      headers: {'X-API-Key': apikey}
    }
  );

  result = JSON.parse(result);

  console.log(endpoint + 'updateOwner/' + result.id);
  await http.put(`${endpoint}updateOwner/${result.id}`,
    {
      headers: {'X-API-Key': apikey},
      body: {
        owner: req.body.type
      },
      json: true
    }
  );

  console.log(endpoint + 'updateBalance/' + result.id);
  await http.put(`${endpoint}updateBalance/${result.id}`,
    {
      headers: {'X-API-Key': apikey},
      body: {
        balance: req.body.balance
      },
      json: true
    }
  );

  let user = await User.findById(req.user._id);
  user.accounts.push(result.id);
  await user.save();
  res.status(204).json(result);
});

router.get('/accounts', async (req, res) => {
  async function getAccount(id) {
    console.log(endpoint + id)
    return await http.get(endpoint + id, 
      {
        headers: {'X-API-Key': apikey}
      });
  }

  let user = await User.findById(req.user._id);
  let results = []
  for(let account of user.accounts) {
    results.push(JSON.parse(await getAccount(account)));
  }

  res.status(200).json(results);
});

module.exports = router;
