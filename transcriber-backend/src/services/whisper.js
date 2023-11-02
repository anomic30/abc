const OpenAI = require("openai");
const fs = require("fs");
const { translator } = require("./gpt");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const whisper = async (filePath, lang) => {
  console.log("Whispering...", filePath);
  if(lang=="Default"){
    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1"
      })
      //delete the file after transcription
      fs.unlinkSync(filePath);
      return transcription.text;
    } catch (error) {
      console.log(error);
      throw new Error("Whisper failed");
    }
  }else{
    try {
      const transcription = await openai.audio.translations.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1"
      });
      fs.unlinkSync(filePath);
      const translated = await translator(await transcription.text, lang);
      return translated;
    } catch (error) {
      console.log(error);
      throw new Error("Whisper failed");
    }
  }
}

module.exports = { whisper };