const router = require('express').Router();
const apiRoutes = require('./api');

const keys = require('../config/keys');
const { apiURL } = keys.app;

const api = `${apiURL}`;
console.log("apiurl", apiURL);

// api routes
router.use("/", apiRoutes);

router.use(api, (req, res) => {
    console.log("rreq", req.url);
    res.status(404).json('No API route found')
})

module.exports = router;
