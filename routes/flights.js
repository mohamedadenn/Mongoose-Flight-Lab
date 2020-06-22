var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');
const Flight = require('../model/flight');

router.get('/new', function(req, res, next) {
    res.render('flights/new', { title: 'Express' });
});

router.get('/', flightsCtrl.show)
router.post('/', flightsCtrl.new);

router.get('/:id', flightsCtrl.detail)
router.post('/:id/destinations', flightsCtrl.addDestination)
module.exports = router;