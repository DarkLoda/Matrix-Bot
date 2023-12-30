import { writeFile } from "fs/promises";
import fs from 'fs';
import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (m, Matrix) => {

const API_KEY = 'AIzaSyCdf0QI11bfqok5uX1UXuTvonUkeOF8ooM'

if (m.type === "imageMessage") {
  try {
    const buffer = await m.downloadFile(); // await to get the actual buffer
   // save to file
    const filePath = `./${Date.now()}.png`;
    await writeFile(filePath, buffer);
  const genAI = new GoogleGenerativeAI(API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}
const thinkingMessage = await Matrix.sendMessage(m.from, { text: "Thinking..." }, { quoted: m });

async function run() {
  const { key } = thinkingMessage;
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = m.body || 'Explain about this image';

  const imageParts = [fileToGenerativePart(filePath, "image/png")];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const aitext = response.text();
  if (m.isGroup) {
            m.reply(aitext);
          } else {
            await m.typewriterEffect(aitext, key);
          }
  const speechURL = `https://supreme-catfish-goutammallick516.koyeb.app/speech?text=${encodeURIComponent(aitext)}`;
  await Matrix.sendMessage(m.from, {audio: {url: speechURL},mimetype: "audio/mp4",ptt: true,fileName: `loda.mp3`},{quoted: m});
}

run();
 await fs.promises.unlink(filePath);
  } catch (error) {
    console.error("Error :", error);
}} else {

const command = m.body.split(' ')[0].toLowerCase();
    const prompt = m.body.substring(command.length).trim();
    if (command == '.ai') {
      if (!prompt) return m.reply('Please give me a prompt');	 
      try {
        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI(API_KEY);
        const thinkingMessage = await Matrix.sendMessage(m.from, { text: "Thinking..." }, { quoted: m });
        async function run() {
          // For text-only input, use the gemini-pro model
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const result = await model.generateContent(prompt);
          const { key } = thinkingMessage;
          const response = await result.response;
          const aires = response.text();
          if (m.isGroup) {
            m.reply(aires);
          } else {
            await m.typewriterEffect(aires, key);
          }
          const speechURL = `https://supreme-catfish-goutammallick516.koyeb.app/speech?text=${encodeURIComponent(aires)}`;
          await Matrix.sendMessage(m.from, {audio: {url: speechURL},mimetype: "audio/mp4",ptt: true,fileName: `loda.mp3`},{quoted: m});

        }

        run();

      } catch (error) {
        console.error("Error generating response:", error);
      }
}}
};

export default gemini;
