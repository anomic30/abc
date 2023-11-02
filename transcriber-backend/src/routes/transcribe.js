const express = require('express');
const { transcribeController, getTranscribes, deleteTranscribeController, ytController } = require('../controllers/transcribe.js');
const { fileSizeLimiter } = require("../middlewares/fileSizeLimit.js");

const router = express.Router();

router.post('/upload', fileSizeLimiter, transcribeController);
router.post('/youtube', ytController);
router.get('/all', getTranscribes);
router.delete('/:id', deleteTranscribeController);

module.exports = router;