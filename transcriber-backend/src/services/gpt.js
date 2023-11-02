const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const translator = async (inputText, targetLanguage) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an excellent translator." },
        { role: "user", content: `Translate '${inputText}' into ${targetLanguage} with a human-like tone.` },
      ],
      model: "gpt-3.5-turbo",
    });
    
    console.log(completion.choices[0]);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw new Error("Translation failed");
  }
}

module.exports = { translator };