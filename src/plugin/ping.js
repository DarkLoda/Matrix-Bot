const ping = async (m, Matrix) => {

if (m.body === ".ping") {

 const startTime = new Date();
 const { key } = await Matrix.sendMessage(m.from, { text: 'Pinging...' }, {quoted: m});
 await m.React('🍌')
 const text = `*Respond Speed: ${new Date() - startTime} ms*`
 await m.typewriterEffect(text, key);
 await m.React('🍑')
}}

export default ping;