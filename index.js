const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    auth: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});
client.on('qr', qr => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ Bot conectado a WhatsApp!');
});

client.on('message_create', async (msg) => {
    console.log('Mensaje recibido:', msg.body);
    
    if (msg.body === '!hola') {
        await msg.reply('¡Hola! Soy un bot. Escribe !ayuda para ver los comandos.');
    }
    
    if (msg.body === '!ayuda') {
        await msg.reply('Comandos disponibles:\n!hola - Saludo\n!hora - Hora actual\n!dado - Lanza un dado');
    }
    
    if (msg.body === '!hora') {
        const hora = new Date().toLocaleTimeString('es-MX');
        await msg.reply('La hora actual es: ' + hora);
    }
    
    if (msg.body === '!dado') {
        const numero = Math.floor(Math.random() * 6) + 1;
        await msg.reply('🎲 Salió: ' + numero);
    }
});

client.initialize();