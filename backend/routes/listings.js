const express = require('express');
const Listing = require('../models/listingModel');
const uuidv4 = require('uuid/v4');
const router = express.Router();

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

  const newListing = new Listing({
    _id: uuidv4(),
    active: true,
    item: {
        id: req.body.item.id,
        accType: req.body.item.accType,
        amount: req.body.item.amount,
    },
    acceptedAccTypes: req.body.acceptedAccTypes,
    userId: "test",
    description: req.body.description,
  })

  newListing.save();
  return res.status(201).json({id: newListing._id})
})

router.get('/', async (req, res) => {
  const query = await Listing.find().exec();
  if(!query) {
    res.status(500);
    return;
  }
  return res.status(200).json(query);
});

module.exports = router;
