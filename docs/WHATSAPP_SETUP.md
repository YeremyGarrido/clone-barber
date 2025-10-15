# ========================================
# CONFIGURACIÓN DE WHATSAPP BUSINESS API
# ========================================
# Tutorial completo para configurar WhatsApp Business API

## 📋 Prerrequisitos
- Cuenta de Meta (Facebook) Business
- Número de teléfono válido (no puede ser usado en WhatsApp personal)
- Tarjeta de crédito (para verificación, los primeros 1000 mensajes/mes son gratis)

## 🔧 Paso 1: Crear App en Meta for Developers

1. Ve a: https://developers.facebook.com/apps/
2. Click en "Crear aplicación"
3. Selecciona "Empresa" como tipo de app
4. Completa los datos:
   - Nombre de la app: "La Diarquia Booking"
   - Email de contacto: tu email
   - Empresa (opcional): tu empresa
5. Click en "Crear aplicación"

## 📱 Paso 2: Configurar WhatsApp Business

1. En el panel de tu app, busca "WhatsApp" en productos
2. Click en "Configurar" en WhatsApp
3. Selecciona tu cuenta de empresa o crea una nueva
4. Click en "Continuar"

## 🔑 Paso 3: Obtener Credenciales

### Phone Number ID

1. En el panel de WhatsApp, ve a "Primeros pasos"
2. En "Enviar y recibe mensajes", encontrarás:
   - **Phone Number ID**: Copia este valor (ejemplo: 123456789012345)
   - Número de teléfono de prueba (para testing)

### Access Token

1. En la misma sección "Primeros pasos"
2. Verás un "Token de acceso temporal" (válido por 24 horas)
3. Para producción, necesitas un **Token permanente**:
   - Ve a "Configuración" → "Configuración de la app" → "Básica"
   - Copia el "ID de la aplicación"
   - Ve a https://business.facebook.com/settings/system-users
   - Crea un "Usuario del sistema"
   - Asigna permisos: "whatsapp_business_management" y "whatsapp_business_messaging"
   - Genera un token con estos permisos (SIN FECHA DE VENCIMIENTO)

## 📋 Paso 4: Configurar Número de Teléfono

### Para Testing (Número de Prueba)
1. El número de prueba viene incluido
2. Solo puedes enviar mensajes a números verificados
3. Para verificar un número:
   - Ve a "Primeros pasos" → "Agregar número de teléfono"
   - Ingresa el número (formato: +56912345678)
   - Recibirás un código de verificación por WhatsApp

### Para Producción (Tu Número Real)
1. Ve a "Configuración" → "Números de teléfono"
2. Click en "Agregar número de teléfono"
3. Selecciona tu método de verificación:
   - SMS
   - Llamada de voz
4. Sigue las instrucciones para verificar
5. Una vez verificado, selecciónalo como número principal

## 🔐 Paso 5: Configurar Variables de Entorno

### Opción A: Desarrollo Local (.env)

Crea o edita `server/.env`:

```env
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=tu_token_permanente_aqui
```

### Opción B: Producción (Fly.io)

```bash
fly secrets set WHATSAPP_PHONE_NUMBER_ID="123456789012345"
fly secrets set WHATSAPP_ACCESS_TOKEN="tu_token_permanente"
```

## 📝 Paso 6: Crear Plantilla de Mensaje (Template)

1. Ve a "Administrador de WhatsApp" → "Plantillas de mensajes"
2. Click en "Crear plantilla"
3. Completa:
   - **Nombre**: `booking_confirmation` (sin espacios, solo lowercase y guiones)
   - **Categoría**: "Servicios varios"
   - **Idioma**: Español
   - **Contenido**: 
   
```
Hola {{1}}, ¡tu cita está confirmada! 🎉

📅 Fecha: {{2}}
🕐 Hora: {{3}}
✂️ Servicio: {{4}}

Te esperamos en:
📍 Almte. Pastene 70, Providencia

Si necesitas cancelar o reprogramar, contáctanos.

Saludos,
La Diarquía
```

4. Los `{{1}}`, `{{2}}`, etc. son variables que se reemplazan dinámicamente
5. Click en "Enviar" para revisión (Meta tarda 1-24 horas en aprobar)

## ✅ Paso 7: Verificar Configuración

### Test con número verificado:

```bash
# En tu terminal
cd server
npm run dev
```

Luego haz una petición POST a `/api/bookings` con:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+56912345678",
  "service": "Corte Personalizado",
  "date": "2024-03-20",
  "time": "14:00"
}
```

Deberías recibir un mensaje de WhatsApp en el número especificado.

## 🔍 Solución de Problemas

### Error: "Phone number not found"
- Verifica que el `WHATSAPP_PHONE_NUMBER_ID` sea correcto
- Asegúrate de estar usando el Phone Number ID, no el número de teléfono

### Error: "Invalid access token"
- Verifica que el token sea permanente (no temporal)
- Regenera el token si es necesario
- Asegúrate de tener los permisos correctos

### Error: "Template not approved"
- Espera a que Meta apruebe tu plantilla (1-24 horas)
- Revisa que la plantilla cumpla con las políticas de Meta
- Mientras tanto, usa un mensaje de texto simple (no template)

### Error: "Recipient phone number not registered"
- Para testing: verifica que el número receptor esté agregado en "Números de teléfono para pruebas"
- Para producción: asegúrate de que el número tenga WhatsApp instalado

### Mensajes no se envían
- Verifica que tienes crédito en tu cuenta de Meta Business
- Revisa los logs de WhatsApp API en el panel de Meta
- Asegúrate de que el formato del teléfono sea correcto (+56912345678)

## 💰 Costos

- **Gratis**: Primeros 1000 mensajes de conversación por mes
- **Después**: ~$0.05 USD por conversación
- **Sin costo**: Mensajes dentro de las primeras 24 horas de una conversación iniciada por el usuario

## 📊 Monitoreo

1. Ve al panel de Meta for Developers
2. Sección "WhatsApp" → "Análisis"
3. Revisa:
   - Mensajes enviados
   - Mensajes entregados
   - Mensajes leídos
   - Errores

## 🔗 Links Útiles

- Meta for Developers: https://developers.facebook.com
- Documentación oficial: https://developers.facebook.com/docs/whatsapp/cloud-api
- WhatsApp Business Manager: https://business.facebook.com/wa/manage
- Precios: https://developers.facebook.com/docs/whatsapp/pricing

## 📝 Notas Importantes

1. **NUNCA expongas tu Access Token en el código o repositorio**
2. Usa variables de entorno para producción
3. El número de prueba solo funciona con números verificados
4. Las plantillas deben ser aprobadas por Meta antes de usarlas
5. Respeta las políticas de mensajería de WhatsApp
6. No envíes spam o mensajes no solicitados

---

**¿Necesitas ayuda?** Revisa los logs del servidor y el panel de Meta para errores específicos.
