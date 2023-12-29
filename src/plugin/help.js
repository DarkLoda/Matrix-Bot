import moment from 'moment-timezone'

const menu = async (m, Matrix) => {
    //  Bot Prosess Time
    const uptime = process.uptime();
    const day = Math.floor(uptime / (24 * 3600)); // Calculate days
    const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
    const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
    const seconds = Math.floor(uptime % 60); // Calculate seconds

    //Uptime
    const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
    const runMessage = `*☀️ ${day} Day*\n *🕐 ${hours} Hour*\n *⏰ ${minutes} Minutes*\n *⏱️ ${seconds} Seconds*\n`;

    const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
    const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
    const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
    if (time2 < "23:59:00") {
        var pushwish = `Good Night 🌌`;
    }
    if (time2 < "19:00:00") {
        var pushwish = `Good Evening 🌃`;
    }
    if (time2 < "18:00:00") {
        var pushwish = `Good Evening 🌃`;
    }
    if (time2 < "15:00:00") {
        var pushwish = `Good Afternoon 🌅`;
    }
    if (time2 < "11:00:00") {
        var pushwish = `Good Morning 🌄`;
    }
    if (time2 < "05:00:00") {
        var pushwish = `Good Morning 🌄`;
    }

    if (m.body === ".menu") {
        const str = `
╭──═❮ *TheMatrix-MD* ❯═─┈•
│ Hi 👋  
╰–❖ *${m.pushName}* 
╭─────────────┄┄┈•
│✑ *${pushwish}* 😄 
╰────────────────❃ 
╭──═❮ *Bot Info* ❯═─┈•
│ *Bot Name* : *TheMatrix-MD*
│ *Owner Name* : *Goutam Stark*
│ *Prefix* :  *[ . ]*
│ *Uptime* : *${hours}h ${minutes}m ${seconds}s*
│ *Mode* : *Public*
╰────────────────❃ 
╭──═❮ *Users Info* ❯═─┈•
│𝗡𝗮𝗺𝗲 : *${m.pushName}*
│𝗡𝘂𝗺𝗯𝗲𝗿 : @${m.sender.split('@')[0]} 
╰────────────────❃ 
╭──═❮ *Date Time* ❯═─┈•
│𝗧𝗶m 𝗲 : *${xtime}*
│𝗗𝗮𝘁𝗲 : *${xdate}*
╰────────────────❃ 
╭──═❮ *COMMANDS* ❯═─┈•
│  ╭──┈•
│  │➛ .Ping
│  │➛ .Menu
│  │➛ .Ai
│  ╰───────────⦁
╰────────────────❃
   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `MATRIX-MD`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
        await Matrix.sendMessage(m.from, { text: str }, { quoted: fgg });
   }
};

export default menu;
