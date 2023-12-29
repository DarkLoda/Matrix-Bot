const ping = async (m, Matrix) => {

if (m.body === ".ping") {

 const startTime = new Date();
 const pingMsg = await Matrix.sendMessage(m.from, { text: 'Pinging...' }, {quoted: m});
 await m.React('🍌')
 await Matrix.relayMessage(m.from, {
      protocolMessage: {
        key: pingMsg.key,
        type: 14,
        editedMessage: {
          conversation: `*Respond Speed: ${new Date() - startTime} ms*`
        }
      }
  }, {});
  await m.React('🍑')
}}

export default ping;