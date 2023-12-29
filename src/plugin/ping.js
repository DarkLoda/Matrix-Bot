const ping = async (m, Matrix) => {

if (m.body === ".ping") {

 const startTime = new Date();
 const { key } = await Matrix.sendMessage(m.from, { text: 'Pinging...' }, {quoted: m});
 await m.React('🍌')
 const str = `*Respond Speed: ${new Date() - startTime} ms*`
 await m.loading(str, key);
 await m.React('🍑')
}}

export default ping;