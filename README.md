
# Twitch Bot Básico

Este es un bot básico para Twitch que responde a comandos simples en el chat.

## Funcionalidades
- Responde a !hola con un saludo personalizado.
- Responde a !ayuda listando comandos disponibles.
- Responde con tus redes sociales
- Y más...

## Configuración
1. Tener Node JS descargado. Si no lo tienes
   puedes descargarlo aquí: https://nodejs.org/en

2. Instalar dependencias:
```
npm install tmi.js
```

3. Configurar usuario y token OAuth en `opts.identity`.

4. Cambiar el canal al que se conecta en `opts.channels`.

5. Ejecutar el bot con:
```
node bot_twitch.js
```

## Notas
- Esta versión es simplificada y sin datos privados ni comandos específicos.
- Para uso avanzado, puedes agregarle más lineas al código sin problemas. Si quieres algo mejor sin hacer mucho, estate atento a mi perfil, actualizaré el código a menudo <3.
- Acordate de cambiar algunas cosas dentro del código, como: el nombre del bot, nombre del canal, el oAUTH Token, comandos, etc...
