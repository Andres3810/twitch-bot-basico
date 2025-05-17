
# Twitch Bot Básico

Este es un bot básico para Twitch que responde a comandos simples en el chat.

## Funcionalidades
- Responde a !hola con un saludo personalizado.
- Responde a !ayuda listando comandos disponibles.

## Configuración
1. Instalar dependencias:
```
npm install tmi.js
```

2. Configurar usuario y token OAuth en `opts.identity`.

3. Cambiar el canal al que se conecta en `opts.channels`.

4. Ejecutar el bot con:
```
node bot.js
```

## Notas
- Esta versión es simplificada y sin datos privados ni comandos específicos.
- Para usos avanzados, personaliza el código según tus necesidades.
