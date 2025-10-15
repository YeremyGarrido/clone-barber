# ========================================
# CONFIGURACIÓN DE GOOGLE CALENDAR API
# ========================================
# Tutorial completo para configurar Google Calendar API

## 📋 Prerrequisitos
- Cuenta de Google
- Google Calendar creado
- Acceso a Google Cloud Console

## 🔧 Paso 1: Crear Proyecto en Google Cloud

1. Ve a: https://console.cloud.google.com
2. Click en "Seleccionar proyecto" → "Nuevo Proyecto"
3. Nombre del proyecto: "la-diarquia-backend" (o el que prefieras)
4. Click en "Crear"
5. Espera a que se cree el proyecto y selecciónalo

## 🔌 Paso 2: Habilitar Google Calendar API

1. En la consola, ve al menú ☰ → "APIs y servicios" → "Biblioteca"
2. Busca "Google Calendar API"
3. Click en "Google Calendar API"
4. Click en "Habilitar"
5. Espera a que se habilite

## 🔑 Paso 3: Crear Service Account (Cuenta de Servicio)

1. Ve al menú ☰ → "APIs y servicios" → "Credenciales"
2. Click en "+ CREAR CREDENCIALES" → "Cuenta de servicio"
3. Completa los datos:
   - Nombre: "barberia-booking-service"
   - ID: (se genera automáticamente)
   - Descripción: "Servicio para gestionar reservas en Google Calendar"
4. Click en "Crear y continuar"
5. **Rol**: Selecciona "Editor" (o "Escritor de Calendar" si está disponible)
6. Click en "Continuar" → "Listo"

## 📥 Paso 4: Descargar Credenciales JSON

1. En la página de "Credenciales", encuentra tu Service Account
2. Click en el email de la Service Account
3. Ve a la pestaña "Claves"
4. Click en "Agregar clave" → "Crear clave nueva"
5. Selecciona formato "JSON"
6. Click en "Crear"
7. Se descargará un archivo JSON con las credenciales

## 📅 Paso 5: Configurar Google Calendar

1. Ve a: https://calendar.google.com
2. En "Mis calendarios", selecciona o crea un calendario para las reservas
3. Click en los tres puntos del calendario → "Configuración y uso compartido"
4. En "Compartir con usuarios y grupos específicos":
   - Click en "+ Agregar personas y grupos"
   - Pega el email de tu Service Account (ejemplo: barberia-booking@proyecto.iam.gserviceaccount.com)
   - Permisos: **"Hacer cambios en los eventos"**
   - Click en "Enviar"
5. En "Integrar calendario", copia el **ID del calendario** (ejemplo: abc123@group.calendar.google.com)

## 🔐 Paso 6: Configurar Variables de Entorno

### Extraer datos del JSON descargado:

Abre el archivo JSON descargado y busca:

```json
{
  "client_email": "tu-service-account@proyecto.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
}
```

### Configurar en el servidor:

#### Opción A: Archivo .env (desarrollo local)

Crea o edita `server/.env`:

```env
GOOGLE_CLIENT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=tu-calendario@group.calendar.google.com
```

**IMPORTANTE**: La clave privada debe estar entre comillas y mantener los `\n`

#### Opción B: Variables de entorno (producción en Fly.io)

```bash
fly secrets set GOOGLE_CLIENT_EMAIL="tu-service-account@proyecto.iam.gserviceaccount.com"
fly secrets set GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
CLAVE_COMPLETA_AQUI
-----END PRIVATE KEY-----
"
fly secrets set GOOGLE_CALENDAR_ID="tu-calendario@group.calendar.google.com"
```

## ✅ Paso 7: Verificar Configuración

Prueba la conexión ejecutando el servidor:

```bash
cd server
npm install
npm run dev
```

Luego haz una petición POST a `/api/bookings` con datos de prueba.

## 🔍 Solución de Problemas

### Error: "Calendar not found"
- Verifica que compartiste el calendario con el email de la Service Account
- Verifica que el ID del calendario sea correcto

### Error: "Invalid credentials"
- Verifica que la clave privada esté completa (incluyendo BEGIN y END)
- Verifica que no haya espacios extra o saltos de línea incorrectos

### Error: "Permission denied"
- Asegúrate de dar permisos de "Editor" o "Hacer cambios en eventos"
- Espera unos minutos, los permisos pueden tardar en aplicarse

### Error: "API not enabled"
- Verifica que Google Calendar API esté habilitada en tu proyecto
- Espera unos minutos después de habilitar la API

## 📝 Notas Importantes

1. **NUNCA subas el archivo JSON de credenciales al repositorio**
2. Usa variables de entorno para producción
3. El email de la Service Account NO es tu email personal
4. Los eventos se crearán en el calendario que compartiste con la Service Account
5. Puedes usar el mismo calendario para múltiples Service Accounts

## 🔗 Links Útiles

- Google Cloud Console: https://console.cloud.google.com
- Google Calendar: https://calendar.google.com
- Documentación oficial: https://developers.google.com/calendar/api/quickstart/nodejs

---

**¿Necesitas ayuda?** Revisa los logs del servidor con `npm run dev` para ver errores específicos.
