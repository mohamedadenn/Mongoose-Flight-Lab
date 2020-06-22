const Flight = require('../model/flight');


module.exports = {
    new: newFlights,
    show: showFlights,
    detail,
    addDestination
}

function newFlights(req, res, next) {
    const flights = new Flight(req.body);
    flights.save(function(err) {
        if (err) {
            console.log(err);
            return res.render('/flights/new');
        }
        res.redirect('/flights');
    });
}

function showFlights(req, res, next) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights });
    })
}

function detail(req, res, next) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('flights/show', { flight });
    });
}

function addDestination(res, req, next) {
    Flight.findById(req.params.id, function(err, flight) {
        if (err) {
            console.log(err);
            return res.redirect('/flights/' + req.params.id);
        }
        flight.destinations.push(req.body);

        flight.save(function(err) {
            if (err) {
                console.log(err);
                return res.redirect('/flights/' + req.params.id);
            }
            res.redirect(`/flights/${flight._id}`);
        });
    });
}