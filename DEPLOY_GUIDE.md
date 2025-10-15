# ========================================
# GUÍA DE DESPLIEGUE COMPLETA
# ========================================

## 🎯 Arquitectura del Proyecto

```
La Diarquía
│
├── FRONTEND (HTML/CSS/JS) → Vercel
└── BACKEND (Node.js/Express) → Fly.io
```

---

## 🔐 PARTE 1: SEGURIDAD (CRÍTICO - HACER PRIMERO)

### ⚠️ Problema Detectado
Las credenciales están expuestas en el repositorio en:
- `server/.secrets.env`
- Posiblemente en el historial de Git

### ✅ Solución

#### 1. Rotar TODAS las credenciales

**WhatsApp Business:**
1. Ve a https://developers.facebook.com/apps/
2. Selecciona tu app
3. Regenera el Access Token:
   - Settings → Basic → App Secret → Show → Reset
4. Genera un nuevo Token permanente en Business Manager

**Google Cloud:**
1. Ve a https://console.cloud.google.com
2. IAM & Admin → Service Accounts
3. Encuentra tu Service Account
4. Click en los 3 puntos → "Manage Keys"
5. Delete la clave actual
6. "Add Key" → "Create new key" → JSON
7. Descarga el nuevo JSON

#### 2. Limpiar historial de Git

**Opción A: Usando git-filter-repo (recomendado)**

```bash
# Instalar git-filter-repo
pip install git-filter-repo

# En la raíz del proyecto
git filter-repo --invert-paths --path server/.secrets.env --path server/credentials.json --force

# Forzar push
git push origin --force --all
git push origin --force --tags
```

**Opción B: Usando git filter-branch**

```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch server/.secrets.env server/credentials.json" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
git push origin --force --tags
```

#### 3. Eliminar archivos sensibles del repo

```bash
cd server
git rm -f --cached .secrets.env
git commit -m "chore(security): remove leaked secrets"
git push
```

---

## 🚀 PARTE 2: CONFIGURAR SERVICIOS EXTERNOS

### 📅 Google Calendar API

Sigue la guía completa en: `server/GOOGLE_CALENDAR_SETUP.md`

**Resumen rápido:**
1. Crear proyecto en Google Cloud Console
2. Habilitar Google Calendar API
3. Crear Service Account
4. Descargar credenciales JSON
5. Compartir calendario con el email de la Service Account
6. Extraer `client_email`, `private_key` y `calendar_id`

### 📱 WhatsApp Business API

Sigue la guía completa en: `server/WHATSAPP_SETUP.md`

**Resumen rápido:**
1. Crear app en Meta for Developers
2. Configurar WhatsApp Business
3. Obtener Phone Number ID
4. Generar Access Token permanente
5. Verificar números de prueba
6. Crear plantilla de mensaje (opcional, tarda 24h en aprobar)

---

## 🌐 PARTE 3: DESPLEGAR FRONTEND (Vercel)

### 📝 Prerrequisitos
- Cuenta en Vercel: https://vercel.com
- Repositorio en GitHub/GitLab/Bitbucket

### 🔧 Pasos

1. **Conectar repositorio**
   ```
   - Ve a https://vercel.com/new
   - Click en "Import Git Repository"
   - Selecciona tu repo "clone-barber"
   - Autoriza acceso si es necesario
   ```

2. **Configurar proyecto**
   ```
   - Framework Preset: Other (o None)
   - Root Directory: . (raíz del proyecto, NO /server)
   - Build Command: (dejar vacío - es HTML estático)
   - Output Directory: . (raíz)
   - Install Command: (dejar vacío)
   ```

3. **Deploy**
   ```
   - Click en "Deploy"
   - Espera 1-2 minutos
   - Copia la URL final (ej: https://la-diarquia.vercel.app)
   ```

4. **Actualizar URL de API**
   
   Después de desplegar el backend, actualiza `index.html` línea ~20:
   ```html
   <meta name="api-base" content="https://la-diarquia-backend.fly.dev/api">
   ```

   Commit y push:
   ```bash
   git add index.html
   git commit -m "chore: update API URL for production"
   git push
   ```
   
   Vercel re-desplegará automáticamente.

### 🔗 Dominio personalizado (opcional)

```
- Ve a tu proyecto en Vercel
- Settings → Domains
- Add Domain
- Sigue las instrucciones para configurar DNS
```

---

## 💻 PARTE 4: DESPLEGAR BACKEND (Fly.io)

### 📝 Prerrequisitos
- Cuenta en Fly.io: https://fly.io/app/sign-up
- `flyctl` instalado: https://fly.io/docs/hands-on/install-flyctl/

### 🔧 Pasos

1. **Autenticarse**
   ```bash
   fly auth login
   ```

2. **Navegar al backend**
   ```bash
   cd server
   ```

3. **Inicializar app**
   ```bash
   fly launch --no-deploy
   ```
   
   - App name: `la-diarquia-backend` (o el que prefieras)
   - Region: `gru` (São Paulo) o `scl` (Santiago) - el más cercano
   - PostgreSQL: No
   - Redis: No
   - Deploy: No (lo haremos manual)

4. **Verificar fly.toml**
   
   Ya está creado. Verifica que contenga:
   ```toml
   app = "la-diarquia-backend"
   primary_region = "gru"
   
   [http_service]
     internal_port = 3000
     force_https = true
   ```

5. **Configurar secretos**
   
   Crea un archivo temporal `server/.secrets.env` (NO LO SUBAS A GIT):
   
   ```env
   WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id
   WHATSAPP_ACCESS_TOKEN=tu_access_token_permanente
   GOOGLE_CLIENT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   TU_CLAVE_PRIVADA_COMPLETA_AQUI
   -----END PRIVATE KEY-----
   "
   GOOGLE_CALENDAR_ID=tu-calendario@group.calendar.google.com
   FRONTEND_URL=https://la-diarquia.vercel.app
   NODE_ENV=production
   PORT=3000
   ```

   **Importar secretos:**
   
   Windows PowerShell:
   ```powershell
   Get-Content .secrets.env | fly secrets import
   ```
   
   Windows CMD:
   ```cmd
   type .secrets.env | fly secrets import
   ```
   
   macOS/Linux:
   ```bash
   fly secrets import < .secrets.env
   ```

   **Verificar secretos:**
   ```bash
   fly secrets list
   ```

6. **Desplegar**
   ```bash
   fly deploy
   ```

7. **Verificar estado**
   ```bash
   fly status
   fly logs
   ```

8. **Probar health check**
   ```bash
   curl https://la-diarquia-backend.fly.dev/health
   ```
   
   Deberías recibir:
   ```json
   {
     "success": true,
     "message": "Servidor funcionando correctamente",
     "timestamp": "2024-...",
     "environment": "production"
   }
   ```

9. **Probar endpoint de reservas**
   ```bash
   curl -X POST https://la-diarquia-backend.fly.dev/api/bookings \
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

### 🔧 Comandos útiles de Fly.io

```bash
# Ver logs en tiempo real
fly logs

# Reiniciar la app
fly apps restart

# Escalar máquinas
fly scale count 1

# Ver métricas
fly dashboard

# SSH a la máquina
fly ssh console

# Ver configuración actual
fly config show

# Actualizar secretos individuales
fly secrets set FRONTEND_URL=https://nuevo-dominio.com

# Eliminar un secreto
fly secrets unset NOMBRE_SECRETO
```

---

## ✅ PARTE 5: VERIFICACIÓN FINAL

### Frontend (Vercel)

1. **Accede a tu sitio**
   ```
   https://la-diarquia.vercel.app
   ```

2. **Verifica:**
   - ✅ Página carga correctamente
   - ✅ Estilos se aplican
   - ✅ Animaciones funcionan
   - ✅ Menú móvil funciona
   - ✅ Formulario de contacto visible

### Backend (Fly.io)

1. **Health check**
   ```bash
   curl https://la-diarquia-backend.fly.dev/health
   ```

2. **Logs**
   ```bash
   fly logs
   ```
   
   Busca:
   ```
   ✅ Servidor ejecutándose en: http://localhost:3000
   🌍 Entorno: production
   🔒 CORS habilitado para: https://la-diarquia.vercel.app
   ```

### Integración Completa

1. **Abrir el sitio en navegador**
   ```
   https://la-diarquia.vercel.app
   ```

2. **Completar formulario de reserva**
   - Nombre: Tu nombre
   - Email: Tu email
   - Teléfono: +56912345678 (verificado en WhatsApp)
   - Servicio: Corte Personalizado
   - Fecha: Mañana
   - Hora: 14:00

3. **Enviar formulario**

4. **Verificar:**
   - ✅ Mensaje de confirmación en el sitio
   - ✅ Evento creado en Google Calendar
   - ✅ Mensaje recibido en WhatsApp
   - ✅ No hay errores en consola del navegador (F12)

---

## 🔍 SOLUCIÓN DE PROBLEMAS

### Error: CORS

**Síntoma:** Error en consola del navegador sobre CORS

**Solución:**
```bash
# Verificar variable FRONTEND_URL
fly secrets list

# Actualizar si es necesario
fly secrets set FRONTEND_URL=https://tu-dominio-real.vercel.app

# Reiniciar
fly apps restart
```

### Error: "Calendar not found"

**Solución:**
1. Verifica que compartiste el calendario con el email de la Service Account
2. Verifica el ID del calendario
3. Espera 5 minutos para que los permisos se propaguen

### Error: "WhatsApp API failed"

**Solución:**
1. Verifica que el token sea permanente
2. Verifica que el número receptor esté verificado (para testing)
3. Revisa logs de WhatsApp en Meta Dashboard

### Backend no responde

**Solución:**
```bash
# Ver logs
fly logs

# Ver estado
fly status

# Reiniciar
fly apps restart

# Si nada funciona, redesplegar
fly deploy --force
```

### Frontend muestra "API error"

**Solución:**
1. Verifica que la URL de API en `index.html` sea correcta
2. Abre la consola (F12) y busca errores
3. Prueba el endpoint manualmente con `curl`

---

## 📊 MONITOREO

### Fly.io Dashboard
```
https://fly.io/apps/la-diarquia-backend
```

- Métricas de CPU/RAM
- Logs en tiempo real
- Health checks
- Requests por minuto

### Vercel Dashboard
```
https://vercel.com/tu-usuario/la-diarquia
```

- Analytics
- Deployments
- Logs
- Build times

### Google Calendar
```
https://calendar.google.com
```

- Verifica eventos creados
- Comprueba que no haya duplicados

### Meta (WhatsApp)
```
https://developers.facebook.com/apps/tu-app/whatsapp-business/wa-dev-console
```

- Mensajes enviados
- Errores
- Rate limits

---

## 💰 COSTOS ESTIMADOS

### Vercel
- **Hobby Plan:** GRATIS
  - 100 GB bandwidth
  - 100 build hours
  - Despliegues ilimitados

### Fly.io
- **Free Tier:**
  - 3 máquinas compartidas
  - 256 MB RAM cada una
  - 160 GB bandwidth
  - **Tu app usa 1 máquina = GRATIS**

### WhatsApp Business API
- **Gratis:** 1000 conversaciones/mes
- **Después:** ~$0.05 USD/conversación
- **Tu volumen estimado:** < 100/mes = GRATIS

### Google Calendar API
- **Gratis:** 1,000,000 requests/día
- **Tu volumen:** < 1000/mes = GRATIS

### 💵 TOTAL: **$0 USD/mes** (dentro de límites gratuitos)

---

## 🔄 ACTUALIZACIONES FUTURAS

### Actualizar frontend
```bash
# Hacer cambios en el código
git add .
git commit -m "feat: nueva funcionalidad"
git push

# Vercel despliega automáticamente
```

### Actualizar backend
```bash
cd server
# Hacer cambios en el código
git add .
git commit -m "fix: corregir bug"
git push

# Desplegar manualmente en Fly.io
fly deploy
```

### Rollback en caso de error

**Vercel:**
```
- Ve al dashboard
- Deployments
- Encuentra el deployment anterior que funcionaba
- Click en los 3 puntos → "Promote to Production"
```

**Fly.io:**
```bash
# Ver historial de versiones
fly releases

# Rollback a la versión anterior
fly releases rollback
```

---

## 📝 CHECKLIST FINAL

### Seguridad
- [ ] Credenciales rotadas (WhatsApp y Google)
- [ ] Historial de Git limpiado
- [ ] `.secrets.env` eliminado del repo
- [ ] Variables en Fly.io configuradas
- [ ] CORS configurado con dominio específico

### Frontend
- [ ] Desplegado en Vercel
- [ ] URL de API actualizada
- [ ] Sitio accesible públicamente
- [ ] Formulario funcional
- [ ] Responsive en móvil

### Backend
- [ ] Desplegado en Fly.io
- [ ] Health check responde
- [ ] Logs sin errores
- [ ] Google Calendar integrado
- [ ] WhatsApp integrado
- [ ] Rate limiting activo

### Testing
- [ ] Crear reserva de prueba
- [ ] Verificar evento en Google Calendar
- [ ] Verificar mensaje en WhatsApp
- [ ] Probar en móvil
- [ ] Probar desde diferentes navegadores

---

## 🎉 ¡FELICITACIONES!

Tu aplicación está **100% desplegada** y lista para producción.

**URLs importantes:**
- Frontend: `https://la-diarquia.vercel.app`
- Backend: `https://la-diarquia-backend.fly.dev`
- Health: `https://la-diarquia-backend.fly.dev/health`
- API: `https://la-diarquia-backend.fly.dev/api/bookings`

**Próximos pasos sugeridos:**
1. Configurar dominio personalizado
2. Agregar Google Analytics
3. Configurar alertas de error (Sentry)
4. Implementar backup de datos
5. Agregar más funcionalidades

---

**¿Necesitas ayuda?** Revisa los logs con `fly logs` y la consola del navegador (F12).
