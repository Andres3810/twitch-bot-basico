
/**
 * ##########################################################
 * #                                                        #
 * #      ###    ##    ##  ########  ########  ########     #
 * #     ## ##   ###   ##  ##     ## ##     ## ##           #
 * #    ##   ##  ####  ##  ##     ## ##     ## ##           #
 * #   ##     ## ## ## ##  ##     ## ########  ######       #              
 * #   ######### ##  ####  ##     ## ##   ##   ##           #
 * #   ##     ## ##   ###  ##     ## ##    ##  ##           #
 * #   ##     ## ##    ##  ########  ##     ## ########     #
 * #                                                        #
 * #           Bot Twitch básico para tu lindo canal <3     #
 * #                                                        #
 * ##########################################################
 */

// Versión pública para GitHub, creado por andre._e on discord

// Importar la biblioteca tmi.js para comunicarse con Twitch
const tmi = require('tmi.js');

// Configuración básica del bot
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

// Registrar los eventos principales
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('subscription', onSubscriptionHandler);
client.on('raided', onRaidHandler);

// Conectar el bot a Twitch
client.connect();

// Función para manejar mensajes del chat
function onMessageHandler(channel, userstate, message, self) {
  if (self) return; // Ignorar mensajes del bot
  
  const msg = message.trim().toLowerCase();
  
  // Comando !hola - Saluda al usuario
  if (msg === '!hola') {
    client.say(channel, `Hola @${userstate.username}, ¡bienvenido al chat!`);
  }
  
  // Comando !ayuda - Lista los comandos disponibles
  else if (msg === '!ayuda') {
    client.say(channel, `@${userstate.username} Comandos disponibles: !hola, !ayuda, !dados, !social`);
  }
  
  // Comando !dados - Simula tirar un dado de 6 caras TwT
  else if (msg === '!dados') {
    const result = Math.floor(Math.random() * 6) + 1;
    client.say(channel, `@${userstate.username} tiró los dados y obtuvo un ${result}! 🎲`);
  }
  
  // Comando !social - Muestra las redes sociales
  else if (msg === '!social') {
    client.say(channel, 'Sígueme en Twitter: @tu_twitter | Instagram: @tu_instagram');
  }
  
  // Detectar palabras clave y responder
  if (msg.includes('¿cómo estás?') || msg.includes('como estas')) {
    client.say(channel, `@${userstate.username} ¡Estoy funcionando perfectamente! Gracias por preguntar.`); // este comando si quieres lo puedes eliminar, es opcional.
  }
}

// Función para manejar suscripciones
function onSubscriptionHandler(channel, username, method, message, userstate) {
  client.say(channel, `¡Gracias @${username} por la suscripción! ¡Bienvenido a la comunidad hermoso!`);
}

// Función para manejar raids
function onRaidHandler(channel, username, viewers) {
  client.say(channel, `¡Increíble! @${username} nos está raideando con ${viewers} espectadores. ¡Bienvenidos todos <3!`);
}

// Función que se ejecuta al conectar
function onConnectedHandler(addr, port) {
  console.log(`Conectado a ${addr}:${port} bot creado por andree._e`);
  console.log('Bot listo para recibir comandos!');
}

// EJEMPLOS PARA AÑADIR NUEVOS COMANDOS:
//
// 1. Comando simple:
// if (msg === '!comando') {
//   client.say(channel, 'Respuesta que pondrías de cojones xd');
// }
//
// 2. Comando con parámetros:
// if (msg.startsWith('!saludo ')) {
//   const nombre = msg.split('!saludo ')[1];
//   client.say(channel, `¡Hola ${nombre}!`);
// }
//
// 3. Comando solo para moderadores:
// if (msg === '!ban' && userstate.mod) {
//   client.say(channel, 'Comando de moderador ejecutado');
// }
// Recuerda siempre luego de la function al final al separar abrir una llave. Antes de que cierres la llave pone ";" 
// sino te va a tirar error la consola, luego de eso puedes cerrar llave y ver si agregas otro comando.
// RECUERDA SIEMPRE ANTES DE CREAR UN COMANOD REGISTRAR EL EVENTO, Y QUE SIEMPRE LA FUNCTION "onConnectedHandler" SIEMPRE
// ESTÉ EN LA ÚLTIMA LINEA
// Se agregaran más actualizaciones al código para el público. Paciencia, que es gratis.
