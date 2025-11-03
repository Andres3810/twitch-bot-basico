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
 * #                Versión 2.0 - ¡Más "Chill"!             #
 * #                                                        #
 * ##########################################################
 */

// Versión pública para GitHub, creado por andre._e on discord

// Importar la biblioteca tmi.js
const tmi = require('tmi.js');

// Importar la configuración desde el archivo config.js
// Esto es mucho más óptimo porque usa un archivo
const opts = require('./config.js');

// Crear cliente tmi
const client = new tmi.client(opts);

// --- Set para Cooldowns ---
// Usamos un "Set" para guardar qué usuario está en cooldown.
// Esto evita que la gente spammee comandos.
const onCooldown = new Set();

// Registrar los eventos principales
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('subscription', onSubscriptionHandler);
client.on('raided', onRaidHandler);

// Conectar el bot a Twitch
client.connect().catch(console.error);

// --- Handlers de Eventos ---

// Se ejecuta al conectar
function onConnectedHandler(addr, port) {
  console.log(`Conectado a ${addr}:${port} bot creado por andree._e`);
  console.log('Bot listo para recibir ordenes.');
  // Mensaje opcional al chat cuando se conecta
  client.say(opts.channels[0], 'Bot en linea.');
}

// Se ejecuta con cada mensaje del chat
async function onMessageHandler(channel, userstate, message, self) {
  if (self) return; // Ignorar mensajes del propio bot

  // Convertir todo a minúsculas y quitar espacios extra
  const msg = message.trim().toLowerCase();

  // --- Detector de palabras con msg
include) ---
  if (msg.includes('¿cómo estás?') || msg.includes('como estas')) {
    client.say(channel, `@${userstate.username} ¡Estoy funcionando perfectamente! Gracias por preguntar.`);
  }

  // --- Manejador de Comandos ---
  // Solo procesar si el mensaje empieza con '!'
  if (!msg.startsWith('!')) return;

  // Separar el comando de los argumentos
  // Ej: "!abrazar @andres" -> command = '!abrazar', args = ['@andres']
  const [command, ...args] = msg.split(' ');
  
  // --- Cooldown Check
  // Creamos una clave única por usuario y comando
  const cooldownKey = `${userstate.username}:${command}`;

  if (onCooldown.has(cooldownKey)) {
    console.log(`* Comando en cooldown para ${userstate.username}`);
    return; // Si está en cooldown, no hacer nada.
  }

  // _-_·Switch principal de comandos
  // Un "switch" es más limpio que muchos "if/else if"
  switch (command) {
    case '!hola':
      client.say(channel, `Hola @${userstate.username}, ¡bienvenido al chat! 👋`);
      break;

    case '!ayuda':
    case '!comandos': // Alias: !comandos hace lo mismo que !ayuda
      client.say(channel, `@${userstate.username} Comandos: !hola, !dados, !social, !pregunta, !uptime, !abrazar <usuario>`);
      break;

    case '!dados':
      const result = Math.floor(Math.random() * 6) + 1;
      client.say(channel, `@${userstate.username} tiró los dados y obtuvo un ${result}! 🎲`);
      break;

    case '!social':
      // Usamos la info del config.js
      client.say(channel, `Seguime en Twitter: ${opts.social.twitter} | Instagram: ${opts.social.instagram} | Discord: ${opts.social.discord}`);
      break;

    // -n/-n/ (ahre flahseaba llm) Comandos nuevos

    case '!pregunta':
      // Comando tipo "Bola 8 Mágica"
      if (args.length === 0) {
        client.say(channel, `@${userstate.username}, ¡tienes que hacer una pregunta!`);
        return; // Salir si no hay pregunta
      }
      const respuestas = [
        'Sí, totalmente.', 'Definitivamente.', 'Sin duda.', 'Pregunta de nuevo más tarde...',
        'No puedo predecirlo ahora.', 'Mejor no te lo digo.', 'Mis fuentes dicen que no.', 'Muy dudoso.'
      ];
      const randomRespuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
      client.say(channel, `@${userstate.username}, ${randomRespuesta} ✨`);
      break;

    case '!uptime':
      // Comando para ver cuánto tiempo lleva el stream (usa la API de Twitch)
      try {
        const uptime = await client.uptime(channel);
        if (uptime) {
          client.say(channel, `@${userstate.username}, ¡el stream lleva ${uptime} en vivo! 🔴`);
        } else {
          client.say(channel, `@${userstate.username}, ¡el stream no está en vivo ahora mismo!`);
        }
      } catch (e) {
        console.error('Error al obtener uptime:', e);
        client.say(channel, 'Hubo un error al consultar el uptime.');
      }
      break;

    case '!abrazar':
      // Comando interactivo
      const target = args[0];
      if (!target) {
        client.say(channel, `@${userstate.username} ¡necesitas decir a quién quieres abrazar!`);
        return;
      }
      // Asegurarse de que el target tenga un @
      const cleanTarget = target.startsWith('@') ? target : `@${target}`;
      client.say(channel, `@${userstate.username} le da un gran abrazo a ${cleanTarget} (づ｡◕‿‿◕｡)づ`);
      break;

    // --- Fin de Comandos ---
    default:
      // Opcional: responder si el comando no existe
      // client.say(channel, `@${userstate.username}, ¡ese comando no existe! Usa !ayuda.`);
      console.log(`* Comando desconocido: ${command}`);
      return; // Si el comando no existe, no aplicar cooldown
  }

  // --- Añadir Cooldown ---
  // Añadir al usuario y comando al set de cooldown
  onCooldown.add(cooldownKey);
  
  // Quitar del cooldown después de 5 segundos (5000 ms)
  setTimeout(() => {
    onCooldown.delete(cooldownKey);
  }, 5000);

} // Fin de onMessageHandler

// Se ejecuta con una nueva suscripción
function onSubscriptionHandler(channel, username, method, message, userstate) {
  client.say(channel, `Muchas gracias @${username} por la suscripción paaaa. ¡Bienvenido a la comunidad, que la pases lindo!. <3`);
}

// Se ejecuta cuando hay una raid
function onRaidHandler(channel, username, viewers) {
  client.say(channel, `¡Increíble! @${username} nos está raideando con ${viewers} espectadores. ¡Bienvenidos todos <3!`);
}

// --- ejemplo para añadir comandos ---
//
// Es una papa, solamente añadí un nuevo "case" dentro del "switch (command)":
//
// case '!tu_comando':
//   // Lo que quieras que haga el comando
//   client.say(channel, '¡Este es un comando nuevo!');
//   break; // No olvides el "break"
//
// Comando con argumentos:
// case '!saludo':
//   const nombre = args[0]; // "args[0]" es la primera palabra después del comando
//   if (nombre) {
//     client.say(channel, `Hola, ${nombre}`);
//   } else {
//     client.say(channel, 'Tenés que decirme a quién saludar');
//   }
//   break;
//
// así queda mejor 
//
