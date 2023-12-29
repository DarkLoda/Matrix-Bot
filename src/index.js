import {
    makeWASocket,
    useMultiFileAuthState,
    downloadMediaMessage,
    fetchLatestBaileysVersion,
    getAggregateVotesInPollMessage,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    PHONENUMBER_MCC,
    DisconnectReason
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import { writeFile } from 'fs/promises'
import { Handler, Callupdate, GroupUpdate } from './event/index.js'
import { typeWriter, handleAnswer, checkSession, askAuthMethod, askMobileNumber, setAuthOptions } from '../lib/index.js';
import startServer from './server.js'
const sessionName = "session";
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useStore = false; 
let useMobile = false;
let useQR = false;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";
const store = useStore ? makeInMemoryStore({ logger }) : undefined;
store?.readFromFile("../session");
// Save every 1m
setInterval(() => {
    store?.writeToFile("../session");
}, 10000 * 6);
const msgRetryCounterCache = new NodeCache();
const P = pino({
    level: "silent"
});

// Baileys Connection Option
async function start() {
    let { state, saveCreds } = await useMultiFileAuthState(sessionName);
    let { version, isLatest } = await fetchLatestBaileysVersion();
    await typeWriter(orange("CODED BY GOUTAM KUMAR"), 100);
    await typeWriter(lime(`using WA v${version.join(".")}, isLatest: ${isLatest}`), 100);
 
    const Matrix = makeWASocket({
        version,
        logger: P, // P for hidden log console
        printQRInTerminal: useQR, // If you want to use scan, then change the value of this variable to false
        mobile: useMobile,
        browser: ["chrome (linux)", "", ""], // If you change this then the pairing code will not work
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, P)
        },
        msgRetryCounterCache
    });
    store?.bind(Matrix.ev);

    // save the session
    Matrix.ev.on("creds.update", saveCreds);
    
    // Generating Pairing Code
   if (!Matrix.authState.creds.registered && !useQR) {
        const phoneNumber = await askMobileNumber();
        const code = await Matrix.requestPairingCode(phoneNumber);
        console.log(chalk.bold.white(`YOUR PAIRING CODE: `), chalk.bold.bgGreen(code));
    }

    // Handle Incomming Messages
    Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
    Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
    Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

    // Check baileys connections
    Matrix.ev.on("connection.update", async update => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.red("[😩] Connection closed, reconnecting."));
                start();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.red("[🤕] Connection Lost from Server, reconnecting."));
                start();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red("[😭] Device Logged Out, Please Delete Session and Scan Again."));
                process.exit();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.blue("[♻️] Server Restarting."));
                start();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.red("[⏳] Connection Timed Out, Trying to Reconnect."));
                start();
            } else {
                console.log(chalk.red("[🚫️]Something Went Wrong: Faild to Make Connection"));
            }
        }

        if (connection === "open") {
            console.log(lime("😃 Initigration Sucsessed️ ✅"));
            Matrix.sendMessage(Matrix.user.id, { text: `😃 Initigration Sucsessed️ ✅` });
        }
    });
}

startServer()
start();