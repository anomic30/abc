const express = require('express');
const transcribeRouter = require('./transcribe.js');

const router = express.Router();

router.use('/transcribe', transcribeRouter);

module.exports = router;