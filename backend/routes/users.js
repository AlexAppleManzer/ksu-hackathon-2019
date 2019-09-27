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
  const result = await http.post(endpoint,
    {
      headers: {'X-API-Key': apikey}
    }
  );
  let user = await User.findById(res.user._id);
  user.accounts.append(result.id);
  console.log (user);
  await user.save();
  res.status(204).json(result);
});

router.get('/accounts', async (req, res) => {
  async function getAccount(id) {
    return await http.get(endpoint + id);
  }

  let user = User.findById(res.user._id);
  let results = []
  for(let account in user.accounts) {
    results.push(await getAccount(account));
  }

  res.status(200).json(results);
});

module.exports = router;
