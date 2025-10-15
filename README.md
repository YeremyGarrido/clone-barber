# 🔥 La Diarquía Barbería Premium

## 📋 Descripción
Clon completo y funcional de una página web de barbería moderna, lista para personalizar en VS Code.

## 🚀 Características

### ✨ Diseño Profesional
- Hero section con animaciones
- Secciones de servicios con iconos SVG
- Galería de trabajos
- Tabla de precios con 3 planes
- Formulario de contacto funcional
- Testimonios de clientes
- Footer completo con newsletter

### 🎨 Estilos Modernos
- Diseño responsive (se adapta a móviles, tablets y desktop)
- Animaciones suaves y efectos hover
- Paleta de colores premium (dorado y negro)
- Tipografías elegantes (Google Fonts)
- Efectos parallax y scroll

### ⚡ Funcionalidades JavaScript
- Menú móvil hamburguesa
- Navegación smooth scroll
- Header que cambia al hacer scroll
- Botón "Volver arriba"
- Validación de formularios
- Animaciones al hacer scroll
- Efectos interactivos en tarjetas
- Easter egg secreto (haz clic 5 veces en el logo)

## 📁 Estructura del Proyecto

```
clone-barber/
│
├── index.html          # Página principal
├── css/
│   └── styles.css      # Todos los estilos
├── js/
│   └── script.js       # Toda la funcionalidad
└── images/             # Carpeta para tus imágenes
```

## 🛠️ Cómo Usar

### 1. Abrir en VS Code
```bash
# Navega a la carpeta del proyecto
cd Desktop/proyectos/clone-barber

# Abre VS Code
code .
```

### 2. Abrir en el Navegador
- Opción 1: Doble clic en `index.html`
- Opción 2: Usa la extensión "Live Server" de VS Code (recomendado)
  - Instala "Live Server" desde las extensiones
  - Click derecho en `index.html` → "Open with Live Server"

### 3. Personalizar

#### 🎨 Cambiar Colores
Edita las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #d4a574;      /* Color dorado principal */
    --secondary-color: #8b6f47;    /* Color secundario */
    --dark-color: #1a1a1a;         /* Color oscuro */
    /* Cambia estos valores a tu gusto */
}
```

#### ✏️ Cambiar Textos
Edita directamente en `index.html`:
- Nombre del negocio
- Servicios
- Precios
- Información de contacto
- Testimonios

#### 🖼️ Agregar Imágenes
1. Guarda tus imágenes en la carpeta `images/`
2. Reemplaza los placeholders en el HTML:
```html
<!-- Ejemplo: Hero background -->
<section class="hero" style="background-image: url('images/tu-imagen.jpg');">
```

#### 📱 Cambiar Información de Contacto
En `index.html`, busca la sección `#contact` y modifica:
- Dirección
- Teléfono
- Email
- Horarios

## 🎯 Secciones Principales

1. **Hero** - Sección principal con llamado a la acción
2. **Services** - 6 servicios con iconos y descripciones
3. **About** - Información sobre la barbería
4. **Gallery** - Galería de trabajos realizados
5. **Pricing** - 3 planes de precios (Básico, Premium, Deluxe)
6. **Testimonials** - Reseñas de clientes
7. **Contact** - Formulario de contacto + información
8. **Footer** - Links, newsletter y redes sociales

## 🔧 Personalizaciones Comunes

### Cambiar el Logo
Busca en `index.html`:
```html
<div class="logo">
    <h1>Barbe<span>X</span></h1>
</div>
```

### Agregar/Quitar Servicios
En la sección `services-grid`, copia/elimina bloques de `.service-card`

### Modificar Precios
En la sección `pricing-grid`, edita los valores:
```html
<div class="price">
    <span class="currency">$</span>
    <span class="amount">25</span>
</div>
```

### Cambiar Fuentes
En `index.html`, modifica el link de Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=TU-FUENTE&display=swap" rel="stylesheet">
```

## 📱 Responsive Design
El sitio se adapta automáticamente a:
- 📱 Móviles (< 576px)
- 📱 Tablets (576px - 968px)
- 💻 Desktop (> 968px)

## ⚙️ Extensiones Recomendadas para VS Code

1. **Live Server** - Para ver cambios en tiempo real
2. **Prettier** - Para formatear el código
3. **Auto Rename Tag** - Renombra tags HTML automáticamente
4. **CSS Peek** - Ve estilos CSS desde el HTML
5. **HTML CSS Support** - Autocompletado de clases CSS

## 🎨 Paleta de Colores

- **Primario**: `#d4a574` (Dorado)
- **Secundario**: `#8b6f47` (Marrón)
- **Oscuro**: `#1a1a1a` (Negro)
- **Claro**: `#f8f8f8` (Gris claro)
- **Blanco**: `#ffffff`

## 📝 Notas Importantes

- ✅ El formulario actualmente muestra un alert. Para conectarlo a un backend, necesitarás un servicio como:
  - FormSpree
  - EmailJS
  - Tu propio servidor PHP/Node.js

- ✅ Las imágenes son placeholders. Reemplázalas con tus propias fotos.

- ✅ Los enlaces de redes sociales están con "#". Agrégales tus URLs reales.

## 🐛 Solución de Problemas

### Los estilos no se aplican
- Verifica que la ruta en `index.html` sea correcta: `<link rel="stylesheet" href="css/styles.css">`

### JavaScript no funciona
- Verifica que la ruta del script sea correcta: `<script src="js/script.js"></script>`
- Abre la consola del navegador (F12) para ver errores

### Las fuentes no cargan
- Verifica tu conexión a internet (Google Fonts requiere internet)

## 📧 Contacto para Soporte

Si necesitas ayuda adicional, puedes:
1. Revisar la consola del navegador (F12)
2. Buscar en Google el error específico
3. Consultar documentación de MDN Web Docs

## 📄 Licencia

Este proyecto es libre para uso personal y comercial. Modifícalo como quieras.

---

## 🎉 Próximos Pasos Sugeridos

1. ✅ Agregar tus propias imágenes
2. ✅ Personalizar colores y fuentes
3. ✅ Conectar el formulario a un backend
4. ✅ Agregar Google Maps para la ubicación
5. ✅ Integrar sistema de reservas online
6. ✅ Optimizar imágenes para web
7. ✅ Agregar meta tags para SEO
8. ✅ Implementar Google Analytics

---

**¡Hecho con ❤️ para BarbeX!**

🔥 **Tip**: Haz clic 5 veces seguidas en el logo para descubrir un Easter Egg

---

## Deploy

Consulta las instrucciones de despliegue y seguridad en `DEPLOY.md`.
