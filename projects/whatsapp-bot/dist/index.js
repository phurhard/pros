import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import dotenv from 'dotenv';
import { PhurhardAgent } from './agent.js';
dotenv.config();
// Agent Instance
const apiKey = process.env['GEMINI_API_KEY'] || '';
const agent = new PhurhardAgent(apiKey);
// WhatsApp Client Configuration
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});
client.on('qr', (qr) => {
    console.log('QR RECEIVED');
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('PhurhardAgent is ready!');
});
client.on('message', async (msg) => {
    // Only respond to personal messages or specific bot calls
    const isBotTriggered = msg.body.startsWith('!bot') || msg.body.toLowerCase().startsWith('hey bot');
    const isPrivateChat = msg.from.endsWith('@c.us');
    if (isBotTriggered || isPrivateChat) {
        const prompt = msg.body.replace(/!bot|hey bot/i, '').trim();
        if (!prompt && !isPrivateChat)
            return;
        try {
            console.log(`[Message from ${msg.from}]: ${prompt}`);
            const reply = await agent.processMessage(prompt);
            await msg.reply(reply);
        }
        catch (error) {
            console.error('Bot Error:', error);
            await msg.reply('I encountered an error trying to process that.');
        }
    }
});
client.initialize();
