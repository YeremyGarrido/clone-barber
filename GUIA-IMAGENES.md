# 📸 Guía para Agregar Imágenes

## 🖼️ Dónde Agregar Imágenes

### 1. HERO SECTION (Imagen de Fondo Principal)

**Ubicación en HTML:** Línea ~30 aprox
```html
<!-- ANTES (placeholder) -->
<section id="home" class="hero">

<!-- DESPUÉS (con tu imagen) -->
<section id="home" class="hero" style="background-image: url('images/hero-barberia.jpg');">
```

**Recomendaciones:**
- Tamaño: 1920x1080px (Full HD)
- Formato: JPG (para fotos) o WebP (mejor compresión)
- Peso: Máximo 500KB (optimiza con TinyPNG.com)
- Contenido sugerido: Interior de barbería, barbero trabajando

---

### 2. SECCIÓN ABOUT (Imagen "Sobre Nosotros")

**Ubicación en HTML:** Línea ~140 aprox
```html
<!-- ANTES -->
<div class="about-image-placeholder">
    <span>BARBEX</span>
</div>

<!-- DESPUÉS -->
<img src="images/about-barberia.jpg" alt="Nuestra Barbería" style="width: 100%; height: 500px; object-fit: cover; border-radius: 20px;">
```

**Recomendaciones:**
- Tamaño: 800x600px
- Contenido sugerido: Foto del equipo, interior de la barbería, productos

---

### 3. GALERÍA (6 Imágenes de Trabajos)

**Ubicación en HTML:** Línea ~180 aprox
```html
<!-- ANTES -->
<div class="gallery-item">
    <div class="gallery-placeholder">Corte Clásico</div>
</div>

<!-- DESPUÉS -->
<div class="gallery-item">
    <img src="images/corte-1.jpg" alt="Corte Clásico">
</div>
```

**Repite para las 6 imágenes:**
- corte-1.jpg - Corte Clásico
- corte-2.jpg - Fade Moderno
- corte-3.jpg - Barba Completa
- corte-4.jpg - Pompadour
- corte-5.jpg - Afeitado
- corte-6.jpg - Undercut

**Recomendaciones:**
- Tamaño: 600x600px (cuadradas)
- Formato: JPG
- Peso: 100-200KB cada una
- Contenido: Fotos de antes/después de cortes realizados

---

### 4. ICONOS DE SERVICIOS (Opcional - SVG)

Si quieres reemplazar los iconos SVG por íconos reales:

**Opción 1: Font Awesome (Gratis)**
```html
<!-- Agregar en el <head> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Reemplazar iconos -->
<div class="service-icon">
    <i class="fas fa-cut"></i> <!-- Tijeras -->
</div>
```

**Íconos sugeridos:**
- Corte: `fa-cut`
- Afeitado: `fa-brush`
- Barba: `fa-user`
- Tratamiento: `fa-spray-can`
- Peinado: `fa-magic`
- Coloración: `fa-palette`

---

## 📥 Cómo Descargar Imágenes de Stock (Gratis)

### Sitios Recomendados:
1. **Unsplash** (unsplash.com)
   - Busca: "barber shop", "haircut", "beard"
   
2. **Pexels** (pexels.com)
   - Alta calidad y gratis para uso comercial
   
3. **Pixabay** (pixabay.com)
   - Millones de imágenes gratuitas

### Términos de Búsqueda en Inglés:
- "barber shop interior"
- "haircut men"
- "beard trim"
- "barber cutting hair"
- "barbershop vintage"
- "hair salon modern"

---

## 🎨 Optimización de Imágenes

### ANTES de agregar imágenes al sitio:

1. **Redimensionar**
   - Usa: Photoshop, GIMP (gratis), o Photopea (online gratis)
   - Hero: 1920x1080px
   - Galería: 600x600px
   - About: 800x600px

2. **Comprimir**
   - Sitio web: TinyPNG.com o Squoosh.app
   - Reduce el peso sin perder calidad
   - Objetivo: Hero <500KB, Galería <200KB

3. **Convertir a WebP (Opcional)**
   - Mejor compresión que JPG
   - Herramienta: Squoosh.app
   - Compatibilidad: Todos los navegadores modernos

---

## 🔄 Reemplazar Imágenes de Forma Masiva

Si tienes muchas imágenes, edita directamente en VS Code:

1. **Buscar y Reemplazar** (Ctrl + H)
   - Buscar: `gallery-placeholder`
   - Reemplazar por tu código de imagen

2. **Multi-cursor** (Alt + Click)
   - Edita múltiples líneas a la vez

---

## 📱 Imágenes Responsive

Para que se vean bien en móviles, agrega esto en CSS:

```css
/* Ya está incluido en styles.css */
img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

---

## 🎯 Ejemplo Completo: Cambiar el Hero

### Paso 1: Descargar imagen
- Ve a Unsplash.com
- Busca "barber shop interior"
- Descarga imagen (selecciona tamaño: Large)

### Paso 2: Optimizar
- Abre TinyPNG.com
- Sube la imagen
- Descarga la versión comprimida

### Paso 3: Guardar
- Guarda la imagen en: `clone-barber/images/hero-bg.jpg`

### Paso 4: Modificar CSS
Abre `css/styles.css` y busca (línea ~350 aprox):

```css
/* ANTES */
.hero {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(139, 111, 71, 0.8)),
                url('../images/hero-bg.jpg') center/cover no-repeat;
}

/* La ruta ya está correcta, solo asegúrate que tu imagen se llame hero-bg.jpg */
```

---

## 🖼️ Placeholder Generators (Si no tienes imágenes)

Mientras consigues fotos reales:

1. **Unsplash Source**
   ```html
   <img src="https://source.unsplash.com/800x600/?barber" alt="Barbería">
   ```

2. **Picsum**
   ```html
   <img src="https://picsum.photos/800/600" alt="Imagen">
   ```

3. **PlaceIMG** (específico para barbería)
   ```html
   <img src="https://placeimg.com/800/600/people" alt="Personas">
   ```

---

## ✅ Checklist de Imágenes

- [ ] Hero background (1920x1080px)
- [ ] About image (800x600px)
- [ ] Galería imagen 1 (600x600px)
- [ ] Galería imagen 2 (600x600px)
- [ ] Galería imagen 3 (600x600px)
- [ ] Galería imagen 4 (600x600px)
- [ ] Galería imagen 5 (600x600px)
- [ ] Galería imagen 6 (600x600px)
- [ ] Logo (opcional - 200x200px PNG con fondo transparente)
- [ ] Favicon (opcional - 32x32px)

---

## 🎨 Tips de Fotografía para Barberías

Si vas a tomar tus propias fotos:

1. **Iluminación**
   - Usa luz natural cuando sea posible
   - Evita sombras duras
   - Hora dorada: 1 hora antes del atardecer

2. **Composición**
   - Regla de los tercios
   - Enfoca detalles (tijeras, productos, cortes)
   - Muestra el ambiente

3. **Equipo**
   - Smartphone moderno es suficiente
   - Usa modo retrato para desenfoque de fondo
   - Estabiliza la cámara

---

## 🔧 Solución de Problemas

### La imagen no se muestra
- Verifica la ruta: `images/nombre-archivo.jpg`
- Verifica el nombre del archivo (mayúsculas/minúsculas importan)
- Verifica que la imagen esté en la carpeta correcta

### La imagen se ve distorsionada
```css
/* Agrega esto en CSS */
img {
    object-fit: cover; /* Recorta sin distorsionar */
    /* o */
    object-fit: contain; /* Muestra completa sin recortar */
}
```

### La imagen pesa mucho y carga lento
- Comprímela en TinyPNG.com
- Objetivo: <500KB para hero, <200KB para galería

---

**¡Listo! Ahora puedes agregar todas tus imágenes profesionales! 📸**