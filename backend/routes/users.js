var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
