const express = require('express');
const CardSession = require('../models/cardSession');
const asyncAwaitMiddleware = require('../middleware/asyncAwait');
const router = express.Router();

router.post('/', asyncAwaitMiddleware(startNewSession));

async function startNewSession(req, res) {
    const session = await CardSession().startOpenSession();
    if (!session) { return res.status(404).send("Unable to retrieve cards") };
    await session.save();
    return res.status(200).send(session);
}

module.exports = router;