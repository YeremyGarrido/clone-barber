# ========================================
# README - BACKEND LA DIARQUÍA
# ========================================

## 📋 Descripción
Backend server para el sistema de reservas de La Diarquía Barbería.

Integra:
- ✅ Google Calendar API (registro de citas)
- ✅ WhatsApp Business API (confirmación de reservas)
- ✅ Express.js (servidor HTTP)
- ✅ Rate limiting (protección contra spam)
- ✅ CORS configurado (seguridad)

---

## 🚀 Instalación Local

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

Edita `.env` y completa con tus credenciales:
```env
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

**Google Calendar:**
- Sigue la guía: `GOOGLE_CALENDAR_SETUP.md`

**WhatsApp Business:**
- Sigue la guía: `WHATSAPP_SETUP.md`

### 4. Iniciar servidor

**Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📡 Endpoints

### GET /health
Health check del servidor

**Response:**
```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2024-...",
  "environment": "development"
}
```

### POST /api/bookings
Crea una nueva reserva

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+56912345678",
  "service": "Corte Personalizado",
  "date": "2024-12-20",
  "time": "14:00"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "Reserva creada exitosamente",
  "data": {
    "calendarEventId": "abc123...",
    "whatsappMessageId": "wamid.xyz..."
  }
}
```

**Response (error):**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 🔧 Estructura del Proyecto

```
server/
├── src/
│   ├── api/
│   │   └── routes/
│   │       └── bookings.routes.js      # Rutas de la API
│   ├── controllers/
│   │   └── bookings.controller.js      # Controlador de reservas
│   ├── services/
│   │   ├── booking.service.js          # Lógica de negocio
│   │   ├── googleCalendar.service.js   # Integración Google Calendar
│   │   ├── whatsapp.service.js         # Integración WhatsApp
│   │   └── validation.service.js       # Validación de datos
│   ├── config/                          # Configuraciones (vacío por ahora)
│   └── utils/                           # Utilidades (vacío por ahora)
├── .env                                 # Variables de entorno (NO SUBIR A GIT)
├── .env.example                         # Ejemplo de variables
├── .env.production                      # Template de producción
├── .gitignore                           # Archivos ignorados por Git
├── .dockerignore                        # Archivos ignorados por Docker
├── Dockerfile                           # Configuración de Docker
├── fly.toml                             # Configuración de Fly.io
├── package.json                         # Dependencias
├── server.js                            # Punto de entrada
├── README.md                            # Este archivo
├── GOOGLE_CALENDAR_SETUP.md             # Guía de Google Calendar
└── WHATSAPP_SETUP.md                    # Guía de WhatsApp
```

---

## 🛡️ Seguridad

### Rate Limiting
- **Global:** 100 requests por IP cada 15 minutos
- **Bookings:** 5 reservas por IP cada hora

### CORS
- Configurado para aceptar solo requests del frontend especificado en `FRONTEND_URL`

### Helmet
- Headers de seguridad HTTP habilitados

### Variables de Entorno
- **NUNCA** subas archivos `.env` al repositorio
- Usa `.env.example` como plantilla
- En producción, usa el sistema de secretos de tu hosting (Fly.io secrets)

---

## 🐛 Testing

### Probar health check
```bash
curl http://localhost:3000/health
```

### Probar crear reserva
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+56912345678",
    "service": "Corte Personalizado",
    "date": "2024-12-20",
    "time": "14:00"
  }'
```

---

## 🚢 Despliegue

### Opción 1: Fly.io (recomendado)

Sigue la guía completa en: `../DEPLOY_GUIDE.md`

**Resumen rápido:**
```bash
# Autenticarse
fly auth login

# Inicializar
fly launch --no-deploy

# Configurar secretos
fly secrets import < .secrets.env

# Desplegar
fly deploy

# Verificar
fly status
fly logs
```

### Opción 2: Docker

**Build:**
```bash
docker build -t la-diarquia-backend .
```

**Run:**
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e FRONTEND_URL=https://tu-frontend.com \
  -e WHATSAPP_PHONE_NUMBER_ID=... \
  -e WHATSAPP_ACCESS_TOKEN=... \
  -e GOOGLE_CLIENT_EMAIL=... \
  -e GOOGLE_PRIVATE_KEY="..." \
  -e GOOGLE_CALENDAR_ID=... \
  la-diarquia-backend
```

### Opción 3: Otros servicios

Compatible con:
- Render.com
- Railway.app
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- Azure App Service

**Requisitos:**
- Node.js 18+
- Variables de entorno configuradas
- Puerto configurable (usa `process.env.PORT`)

---

## 📊 Logs

### Desarrollo
```bash
npm run dev
```

Logs en consola con colores y formato legible.

### Producción (Fly.io)
```bash
fly logs
```

Logs en tiempo real del servidor.

### Formato de logs

**Inicio del servidor:**
```
============================================================
🔥  LA DIARQUÍA - SERVIDOR BACKEND  🔥
============================================================
✅ Servidor ejecutándose en: http://localhost:3000
📅 Fecha de inicio: 14/10/2024, 10:30:00
🌍 Entorno: production
🔒 CORS habilitado para: https://tu-frontend.com
🛡️  Rate limiting activo
📡 Endpoints disponibles:
   - GET  /health
   - POST /api/bookings
============================================================
```

**Request exitoso:**
```
📅 Procesando nueva reserva: { name: 'Juan', ... }
✅ Evento creado en Google Calendar: abc123
✅ Mensaje enviado por WhatsApp: wamid.xyz
```

**Error:**
```
❌ Error al crear reserva: Error message
```

---

## 🔍 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "EADDRINUSE: address already in use"
```bash
# El puerto 3000 está ocupado
# Opción 1: Mata el proceso
lsof -ti:3000 | xargs kill -9

# Opción 2: Usa otro puerto
PORT=3001 npm run dev
```

### Error: "Invalid credentials"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que las claves no tengan espacios extra
- Para Google: la clave debe incluir `\n` (saltos de línea)

### Error: "Calendar not found"
- Verifica que el calendario esté compartido con la Service Account
- Espera 5 minutos para que los permisos se propaguen

### Error: "WhatsApp API failed"
- Verifica que el token sea permanente (no temporal)
- Verifica que el número receptor esté verificado (para testing)

---

## 🤝 Contribuir

### Código de estilo
- ESLint: (opcional, agregar configuración)
- Prettier: (opcional, agregar configuración)
- Comentarios JSDoc en funciones principales

### Commit messages
```
feat: nueva funcionalidad
fix: corrección de bug
chore: tareas de mantenimiento
docs: documentación
refactor: refactorización de código
```

---

## 📄 Licencia

ISC

---

## 👥 Equipo

**La Diarquía Backend Team**
- Martín Ruiz
- Tomás Acuña

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs con `npm run dev`
2. Consulta las guías de configuración
3. Revisa la documentación oficial de las APIs

---

**¡Hecho con ❤️ para La Diarquía Barbería!**
