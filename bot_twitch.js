
// Bot Twitch básico para tu lindo canal <3
// Versión pública para GitHub, creado por  andre._e on discord

const tmi = require('tmi.js');

// Configuración básica
const opts = {
  identity: {
    username: 'YourBotUsername',
    password: 'oauth:your_oauth_token_here'  // Para uso público, pedirán configurar esto. Asegurate de usarlo en la cuenta que se vaya a usar como bot
  },
  channels: [
    'channelname' // Cambiar al canal deseado
  ]
};

// Crear cliente tmi
const client = new tmi.client(opts);

// Eventos básicos
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Conectar
client.connect();

// Función para manejar mensajes
function onMessageHandler(channel, userstate, message, self) {
  if (self) return; // Ignorar mensajes del bot

  const msg = message.trim().toLowerCase();

  // Comando simple !hola
  if (msg === '!hola') {
    client.say(channel, `Hola @${userstate.username}, ¡bienvenido al chat!`);
  }

  // Comando simple !ayuda
  else if (msg === '!ayuda') {
    client.say(channel, `@${userstate.username} Comandos disponibles: !hola, !ayuda`);
  }
}

// Función que se ejecuta al conectar
function onConnectedHandler(addr, port) {
  console.log(`Conectado a ${addr}:${port} bot creado por andree._e`);
}


// Se agregara en más adelante actualizaciones al código para el público. Paciencia, que es gratis.
