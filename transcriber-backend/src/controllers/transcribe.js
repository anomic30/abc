const { saveFile, saveTranscription, getAllTranscriptions, deleteTranscribe } = require("../services/transcribe.js");
const { whisper } = require("../services/whisper.js");
const { youtubeDownloader } = require("../services/youtube.js");
const { catchAsync } = require("../utils/catchAsync.js");

const transcribeController = catchAsync(async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    const lang = req.body.language;
    const filePath = await saveFile(file);
    const result = await whisper(filePath, lang);
    const saved = await saveTranscription(file, result);
    console.log("Transcription: ", result);
    res.status(200).json(saved);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
});

const ytController = catchAsync(async (req, res) => {
  try {
    const url = req.body.url;
    const lang = req.body.language;
    const filePath = await youtubeDownloader(url);
    const result = await whisper(filePath, lang);
    // const saved = await saveTranscription(file, result);
    console.log("Transcription: ", result);
    res.status(200).json({msg: "Uploaded"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
});

const getTranscribes = catchAsync(async (req, res) => {
  try {
    const result = await getAllTranscriptions();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
});

const deleteTranscribeController = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTranscribe(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error });
  }
});

module.exports = { transcribeController, getTranscribes, deleteTranscribeController, ytController };