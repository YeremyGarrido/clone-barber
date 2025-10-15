# Backend - La Diarquía Barbería

Servidor backend para el sistema de reservas de La Diarquía.  
Desarrollado en **Node.js + Express**, con integración a **Google Calendar API** y **WhatsApp Business API** para gestionar reservas y confirmaciones automáticas.

---

## Descripción

Este servidor permite crear, registrar y confirmar citas de clientes a través de integraciones con servicios externos.  
Incluye autenticación mediante variables de entorno, protección contra spam y configuración lista para despliegue en **Fly.io** o **Docker**.

---

## Características

- Integración con **Google Calendar API** (creación de eventos).
- Integración con **WhatsApp Business API** (notificación automática).
- Servidor HTTP con **Express.js**.
- **Rate limiting** para evitar abuso.
- **CORS** configurado para el dominio del frontend.
- Preparado para despliegue en Fly.io, Docker o entornos equivalentes.

---

## Instalación local

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Completa el archivo `.env` con tus credenciales:

```
# Servidor
NODE_ENV=development
PORT=3000

# Frontend
FRONTEND_URL=http://localhost:5500

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id
WHATSAPP_ACCESS_TOKEN=tu_access_token

# Google Calendar API
GOOGLE_CLIENT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=tu-calendario@group.calendar.google.com
```

### 3. Configurar servicios externos
- **Google Calendar**: ver `docs/GOOGLE_CALENDAR_SETUP.md`
- **WhatsApp Business**: ver `docs/WHATSAPP_SETUP.md`

### 4. Iniciar servidor
Desarrollo (con autoreload):
```bash
npm run dev
```
Producción:
```bash
npm start
```
Servidor disponible en [http://localhost:3000](http://localhost:3000)

---

## Endpoints

### GET `/health`
Verifica el estado del servidor.  
**Respuesta:**
```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2025-...",
  "environment": "development"
}
```

### POST `/api/bookings`
Crea una nueva reserva.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+56912345678",
  "service": "Corte Personalizado",
  "date": "2025-12-20",
  "time": "14:00"
}
```

**Respuesta (éxito):**
```json
{
  "success": true,
  "message": "Reserva creada exitosamente",
  "data": {
    "calendarEventId": "abc123",
    "whatsappMessageId": "wamid.xyz"
  }
}
```

**Respuesta (error):**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## Estructura del proyecto

```
server/
├── src/
│   ├── api/
│   │   └── routes/
│   │       └── bookings.routes.js
│   ├── controllers/
│   │   └── bookings.controller.js
│   ├── services/
│   │   ├── booking.service.js
│   │   ├── googleCalendar.service.js
│   │   ├── whatsapp.service.js
│   │   └── validation.service.js
│   ├── config/
│   └── utils/
├── .env                 (no subir)
├── .env.example
├── .gitignore
├── .dockerignore
├── Dockerfile
├── fly.toml
├── package.json
├── server.js
└── docs/
    ├── GOOGLE_CALENDAR_SETUP.md
    └── WHATSAPP_SETUP.md
```

---

## Seguridad

**Rate Limiting**
- Global: 100 requests por IP cada 15 minutos.
- Bookings: 5 reservas por IP cada hora.

**CORS**
- Solo acepta solicitudes desde la URL definida en `FRONTEND_URL`.

**Helmet**
- Cabeceras HTTP de seguridad habilitadas.

**Variables de entorno**
- Nunca subir `.env` al repositorio.
- Usar `.env.example` como plantilla.
- En producción, usar secretos gestionados por Fly.io (`fly secrets import`).

---

## Pruebas rápidas

**Comprobar el estado:**
```bash
curl http://localhost:3000/health
```

**Probar creación de reserva:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+56912345678",
    "service": "Corte Personalizado",
    "date": "2025-12-20",
    "time": "14:00"
  }'
```

---

## Despliegue

### Opción 1 – Fly.io (recomendado)
Guía completa: `docs/DEPLOYMENT.md`

Resumen:
```bash
fly auth login
fly launch --no-deploy
fly secrets import < .secrets.env
fly deploy
fly status
fly logs
```

### Opción 2 – Docker
```bash
docker build -t la-diarquia-backend .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e FRONTEND_URL=https://tu-frontend.com \
  -e WHATSAPP_PHONE_NUMBER_ID=... \
  -e WHATSAPP_ACCESS_TOKEN=... \
  -e GOOGLE_CLIENT_EMAIL=... \
  -e GOOGLE_PRIVATE_KEY="..." \
  -e GOOGLE_CALENDAR_ID=... \
  la-diarquia-backend
```

### Opción 3 – Otros servicios
Compatible con Render, Railway, Heroku, AWS Elastic Beanstalk, Google Cloud Run y Azure App Service.  
Requisitos mínimos: Node 18+, variables de entorno configuradas y puerto abierto (`process.env.PORT`).

---

## Logs

**Desarrollo**
```bash
npm run dev
```

**Producción (Fly.io)**
```bash
fly logs
```

Ejemplo de inicio:
```
============================================================
LA DIARQUÍA - SERVIDOR BACKEND
============================================================
Servidor ejecutándose en: http://localhost:3000
Entorno: production
CORS habilitado para: https://tu-frontend.com
Rate limiting activo
Endpoints:
 - GET  /health
 - POST /api/bookings
============================================================
```

---

## Solución de problemas

| Error | Posible causa | Solución |
|-------|----------------|-----------|
| Cannot find module | Falta de dependencias | Eliminar `node_modules` y reinstalar (`npm install`). |
| EADDRINUSE | Puerto 3000 ocupado | Liberar el puerto (`lsof -ti:3000 | xargs kill -9`) o usar otro (`PORT=3001 npm run dev`). |
| Invalid credentials | Variables de entorno incorrectas | Revisar formato de claves, sin espacios ni saltos innecesarios. |
| Calendar not found | Falta de permisos en Google Calendar | Compartir el calendario con la Service Account. |
| WhatsApp API failed | Token temporal o número no verificado | Usar token permanente y validar el número en el Dashboard de Meta. |

---

## Contribución

**Estilo de código**
- (Opcional) Configurar ESLint y Prettier.  
- Documentar funciones principales con JSDoc.

**Mensajes de commit**
- feat: nueva funcionalidad  
- fix: corrección de bug  
- chore: tareas de mantenimiento  
- docs: actualización de documentación  
- refactor: refactorización de código

---

## Licencia

Licencia ISC.  
Uso libre para proyectos personales o comerciales con atribución al autor.

---

## Equipo

La Diarquía Backend Team  
- Martín Ruiz  
- Tomás Acuña  

---

## Soporte

Si encuentras problemas:
1. Revisa los logs (`npm run dev` o `fly logs`).  
2. Consulta las guías de configuración en la carpeta `docs/`.  
3. Verifica las credenciales en las variables de entorno.  
4. Revisa la documentación oficial de las APIs.  

Hecho con dedicación para **La Diarquía Barbería**.
