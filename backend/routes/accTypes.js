const express = require('express');
const AccType = require('../models/accType');
const uuidv4 = require('uuid/v4');
const router = express.Router();

/* GET users listing. */
router.get('/:id', async (req, res) => {
  const type = await AccType.findById(req.params.id);
  if(!type){
    res.status(404);
    return;
  }
  res.status(200).json({id: type._id, name: type.name});
});

router.delete('/:id', async (req, res) => {
  const type = await AccType.findByIdAndDelete(req.params.id);
  if(!type){
    res.status(404);
    return;
  }
  res.status(204);
}); 

router.post('/', async (req, res) => {
  if(!req.body.name) {
    res.status(400);
    return;
  }

  const newType = new AccType({
    name: req.body.name,
    _id: uuidv4()
  })

  newType.save();
  return res.status(201).json({id: newType._id, name: newType.name})
})

router.get('/', async (req, res) => {
  const query = await AccType.find().exec();
  if(!query) {
    res.status(500);
    return;
  }
  return res.status(200).json(query);
});

module.exports = router;
