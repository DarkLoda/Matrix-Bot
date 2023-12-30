const alive = async (m, Matrix) => {
  if (m.body === ".alive") {
    const { key } = await Matrix.sendMessage(m.from, { text: '.' }, { quoted: m });
    await m.React('👋');
    const text = `𝐇𝐞𝐲 👋 𝐈 𝐚𝐦 𝐀𝐥𝐢𝐯𝐞 𝐧𝐨𝐰`;
    await m.typewriterEffect(text, key);
  } else if (m.body === ".loda") {
   try {
    let lodu = 'Lodu'
    Matrix.relayMessage(m.from, {
      scheduledCallCreationMessage: {
        callType: "AUDIO",
        scheduledTimestampMs: 1200,
        title: lodu
      }
    });
  } catch (err) {
    console.log('kida is:', err);
  }}
};

export default alive;
