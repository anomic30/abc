const mongoose = require("mongoose");

const transcribeSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileDuration: {
    type: Number,
    required: true,
  },
  fileTranscription: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Transcribe = mongoose.model('Transcribe', transcribeSchema);

module.exports = Transcribe;