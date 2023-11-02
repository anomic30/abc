const path = require("path");
const Transcribe = require("../database/models/transcribe.js");

const saveFile = async (file) => {
  const filePath = path.resolve(__dirname, "..", "..", "uploads", file.name);
  try {
    await file.mv(filePath);
    return filePath;
  } catch (err) {
    console.error(err);
    throw new Error("File upload failed");
  }
}

const saveTranscription = async (file, transcription) => {
  try {
    const newTranscription = new Transcribe({
      fileName: file.name,
      fileType: file.mimetype,
      fileDuration: file.size,
      fileTranscription: transcription,
    });

    const saved = await newTranscription.save();
    return saved;
  } catch (error) {
    console.error(error);
    throw new Error("Transcription save failed");
  }
}

const getAllTranscriptions = async () => {
  try {
    const transcribes = await Transcribe.find({});
    return transcribes;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to get transcriptions");
  }
}

const deleteTranscribe = async (id) => {
  try {
    const result = await Transcribe.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to delete transcription");
  }
}

module.exports = { saveFile, saveTranscription, getAllTranscriptions, deleteTranscribe };