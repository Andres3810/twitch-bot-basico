/**
 * ##################################
 * #      Archivo de Configuración #
 * ##################################
 *
 * acá van todos los datos sensibles y configuraciones
 * para que no estén mezclados con la lógica del bot.
 */

module.exports = {
  // Identidad del bot
  identity: {
    username: 'YourBotUsername', // Nombre de la cuenta del bot
    password: 'your_oauth_token_here'  // Token OAuth de la cuenta del bot
  },

  // Canal al que se unirá el bot, pueden ser varios.
  channels: [
    'channelname' // Tu canal principal
  ],

  // Redes sociales (para el comando !social)
  social: {
    twitter: '@tu_x',
    instagram: '@tu_ig',
    discord: 'https://discord.gg/discord'
  }
};
