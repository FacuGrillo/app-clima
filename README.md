# 🌦️ App de Clima

Aplicación en **React** que muestra el clima actual de cualquier ciudad utilizando la API de [OpenWeather](https://openweathermap.org/api).  
Incluye barra de búsqueda con sugerencias, navegación por teclado y tema oscuro con detalles en azul eléctrico.

---

## 🚀 Características
- Búsqueda de ciudades con autocompletado (Geocoding API).
- Selección precisa por coordenadas (lat/lon).
- Navegación por sugerencias con flechas del teclado.
- Interfaz con tema oscuro y azul eléctrico.
- Datos en tiempo real: temperatura, condición, viento y humedad.

---

## 📂 Instalación y uso

1. Clonar el repositorio

```bash
git clone https://github.com/FacuGrillo/app-clima.git
```

2. Entrar al proyecto

```bash
cd app-clima
```

3. Instalar dependencias

```bash
npm install
```

4. Configurar la API Key de OpenWeather

Este proyecto usa Vite; la variable de entorno que lee es `VITE_API_KEY`.

Crear un archivo `.env` en la raíz del proyecto con:

```bash
VITE_API_KEY=tu_api_key_aqui
```

En entornos de despliegue (Vercel, Netlify, etc.) configura la variable de entorno `VITE_API_KEY` en la interfaz de la plataforma.

> Importante: No subas tu API key al repositorio. No la incluyas en commits.

5. Ejecutar la app en desarrollo

```bash
npm run dev
```

6. Build para producción

```bash
npm run build
npm run preview   # para probar el build localmente
```

7. Tests

```bash
npm test
```

---

## 🛠️ Tecnologías
- React
- OpenWeather API
- CSS (tema oscuro + azul eléctrico)

---

## 📸 Captura de pantalla
<img width="1067" height="462" alt="Captura de pantalla 2026-07-09 161824" src="https://github.com/user-attachments/assets/72efca9d-b81b-40b3-8cbb-dcfa0a1ee5d9" />



---

## 📌 Licencia
Este proyecto está bajo la licencia MIT.  
Podés usarlo, modificarlo y compartirlo 
