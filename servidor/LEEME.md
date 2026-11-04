# Servidor de IA de VibraVoice 12D Tutor™

Este pequeño servidor (`worker.js`) da a la app tres funciones con IA:

- **Coach de práctica** (botón «Coach»): chat con el tutor del método.
- **Análisis de grabación** (en «Mi progreso»): la app mide afinación y estabilidad, y la IA escucha el audio.
- **Lectura del tutor** (en «Mi progreso»): interpreta el mapa vocal y propone la ruta de la semana.

Corre gratis en Cloudflare Workers y usa Gemini de Google con su nivel gratuito.

## Puesta en marcha

1. **Clave de Gemini:** entra en https://aistudio.google.com/apikey, toca *Create API key* y cópiala.
2. **Cuenta de Cloudflare:** crea una cuenta gratis en https://dash.cloudflare.com/sign-up.
3. **Crear el Worker:** en el panel, ve a *Workers & Pages → Create → Worker*. Ponle de nombre `vibravoice-ia` y toca *Deploy*.
4. **Pegar el código:** toca *Edit code*, borra lo que trae, pega todo el contenido de `worker.js` y toca *Deploy*.
5. **Guardar la clave:** en el Worker ve a *Settings → Variables and Secrets → Add*. Elige tipo *Secret*, nombre `GEMINI_API_KEY`, pega la clave y guarda.
6. **Copiar la dirección:** arriba aparece algo como `https://vibravoice-ia.TU-USUARIO.workers.dev`. Esa dirección se pone en `AI_URL_DEFAULT` dentro de `index.html`.

## Despliegue automático

El Worker `vibravoice-ia` está conectado a este repositorio (rama `main`, carpeta `servidor`). Cada cambio en esta carpeta se publica solo en https://vibravoice-ia.ferminbosquezmc.workers.dev.

## Variables opcionales

- `MODEL`: modelo de Gemini (por defecto `gemini-2.5-flash`).
- `ALLOWED_ORIGINS`: sitios que pueden usar el servidor, separados por coma. Por defecto solo la app publicada en GitHub Pages.

## Notas

- En el nivel gratuito, Google puede usar los datos enviados para mejorar sus productos, y hay un límite diario de solicitudes. Cuando se agota, la app avisa y vuelve a funcionar más tarde.
- La clave nunca va en la app: solo vive en el Worker.
