# Contributing

Gracias por tu interés en contribuir.

Pasos rápidos para poner el proyecto en marcha localmente:

1. Clonar el repositorio

```bash
git clone https://github.com/FacuGrillo/app-clima.git
cd app-clima
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

Copia `.env.example` a `.env` y agrega tu clave de OpenWeather:

```bash
cp .env.example .env
# editar .env y colocar VITE_API_KEY
```

4. Ejecutar en desarrollo

```bash
npm run dev
```

5. Tests

```bash
npm test
```

Sugerencias:

- No subas tu `.env` al repo. Añadí `.env` a `.gitignore` si aún no está.
- Para despliegue en Vercel/Netlify: configurar `VITE_API_KEY` en las Environment Variables del proyecto.
