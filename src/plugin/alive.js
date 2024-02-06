import moment from 'moment-timezone'
const alive = async (m, Matrix) => {
  const cmd = m.body.toLowerCase();
    const uptime = process.uptime();
    const day = Math.floor(uptime / (24 * 3600)); // Calculate days
    const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
    const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
    const seconds = Math.floor(uptime % 60); // Calculate seconds
    const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
    const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
    const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
    if (time2 < "23:59:00") {
        var pushwish = `Good Night`;
    }
    if (time2 < "19:00:00") {
        var pushwish = `Good Evening`;
    }
    if (time2 < "18:00:00") {
        var pushwish = `Good Evening`;
    }
    if (time2 < "15:00:00") {
        var pushwish = `Good Afternoon`;
    }
    if (time2 < "11:00:00") {
        var pushwish = `Good Morning`;
    }
    if (time2 < "05:00:00") {
        var pushwish = `Good Morning`;
    }
  if (cmd === ".alive") {
    const text = `𝐇𝐞𝐲 👋 𝐈 𝐚𝐦 𝐀𝐥𝐢𝐯𝐞 𝐧𝐨𝐰`;
    const audtxt = `Hey ${m.pushName} ${pushwish}. में पिछले ${hours} घंटा ${minutes} minutes और ${seconds} seconds से जिंदा हूं. और तक जिन्दा रहूंगा इसका कोई गारेंटी नहीं हे.`
    const speechURL = `https://supreme-catfish-goutammallick516.koyeb.app/speech?text=${encodeURIComponent(audtxt)}`;
    const img = 'https://i.imgur.com/eHhCPbU.jpg'
    await m.React('👋');
    let doc = {
        audio: {
          url: speechURL
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Matrix",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: text,
          body: "TheMatrix",
          thumbnailUrl: img,
          sourceUrl: 'https://matrixcoder.vercel.app',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };
    let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `Matrix Coder`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
    };
        
    await Matrix.sendMessage(m.from, doc, { quoted: fgg })
  } else if (cmd === ".loda") {
    try {
      let lodu = 'Lodu';
      await Matrix.relayMessage(
        m.from,
        {
          scheduledCallCreationMessage: {
            callType: "AUDIO",
            scheduledTimestampMs: 1200,
            title: lodu
          }
        },
        { messageId: '', participant: '', additionalAttributes: {}, useUserDevicesCache: false, cachedGroupMetadata: {}, statusJidList: [] }
      );
    } catch (err) {
      console.log('kida is:', err);
    }
  }
};

export default alive;