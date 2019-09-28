const express = require('express');
const Listing = require('../models/listingModel');
const uuidv4 = require('uuid/v4');
const router = express.Router();

const config = require('../config');
const http = require('request-promise');

const endpoint = `${config.incomm.endpoint}accounts/`;
const apikey = config.incomm.apiKey;

router.get('/:id', async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if(!listing){
    res.status(404);
    return;
  }
  
  res.status(200).json({
      id: listing._id, 
      created: listing.created,
      active: listing.active,
      item: {
        id: listing.item.id,
        accType: listing.item.accType,
        amount: listing.item.amount
      },
      acceptedAccTypes: listing.acceptedAccTypes,
      userId: listing.userId,
      description: listing.description,
    });
});

router.delete('/:id', async (req, res) => {
  const listing = await Listing.findOneAndDelete({_id: req.params.id});
  if(!listing){
    res.status(404);
    return;
  }

  res.status(204).send();
}); 

router.post('/', async (req, res) => {
  //   if(!req.body.name) {
  //     res.status(400);
  //     return;
  //   }

  let acc = await http.get(`${endpoint}${req.body.itemId}`,
    {
      headers: {'X-API-Key': apikey}
    }
  );

  acc = JSON.parse(acc);

  console.log(acc);
  const newListing = new Listing({
    _id: uuidv4(),
    active: true,
    item: {
      id: acc.id,
      accType: acc.owner,
      amount: acc.balance,
    },
    acceptedAccTypes: req.body.acceptedAccTypes,
    userId: req.user._id,
    description: req.body.description,
  })

  newListing.save();
  return res.status(201).json({id: newListing._id})
})

router.get('/', async (req, res) => {
  console.log(req.query)

  let queryParams = {};
  if(req.query.accType !== 'null') {
    queryParams.item = {};
    queryParams.item.accType = req.query.accType;
  }
  if(req.query.acceptedAccTypes !== 'null') {
    queryParams.acceptedAccTypes = req.query.acceptedAccTypes;
  }
  const query = await Listing.find(queryParams).exec();

  if(!query) {
    res.status(500);
    return;
  }
  return res.status(200).json(query);
});

module.exports = router;
