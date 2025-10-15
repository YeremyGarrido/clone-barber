# La Diarquía - Barbería Premium

Clon funcional de una página web moderna para barberías, con diseño responsive, animaciones, secciones dinámicas y código optimizado para personalización. Ideal como base para proyectos reales o demostraciones profesionales.

---

## Descripción

La Diarquía es un sitio web estático que replica la estructura de una barbería premium. Incluye un diseño adaptable, animaciones, componentes reutilizables y lógica JavaScript para mejorar la experiencia del usuario. El proyecto está listo para desplegarse en Vercel o personalizarse localmente desde VS Code.

---

## Características Principales

**Estructura del Sitio**
- Hero con animaciones y llamada a la acción.
- Secciones de servicios, galería, precios y testimonios.
- Formulario de contacto funcional.
- Footer completo con redes sociales y suscripción.

**Diseño y Experiencia**
- Diseño responsive (mobile-first).
- Paleta de colores premium (dorado, marrón, negro).
- Tipografía elegante mediante Google Fonts.
- Efectos de desplazamiento y animaciones suaves.
- Optimizado para legibilidad y rendimiento.

**Interactividad**
- Menú móvil tipo hamburguesa.
- Navegación con desplazamiento suave.
- Encabezado dinámico al hacer scroll.
- Botón "Volver arriba".
- Validación de formularios.
- Animaciones de entrada y hover.
- Easter egg oculto (clic repetido en el logo).

---

## Estructura del Proyecto

```
clone-barber/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── scss/
│   └── (archivos fuente opcionales)
├── images/
│   └── (imágenes del sitio)
├── docs/
│   ├── DEPLOYMENT.md
│   ├── GOOGLE_CALENDAR_SETUP.md
│   └── WHATSAPP_SETUP.md
└── server/
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── Dockerfile
    └── fly.toml
```

---

## Tecnologías Utilizadas

| Categoría | Tecnologías |
|------------|-------------|
| Frontend | HTML5, CSS3, JavaScript |
| Estilos | SASS (opcional), animaciones CSS |
| Tipografía | Google Fonts |
| Despliegue | Vercel |
| Herramientas | Visual Studio Code, Live Server, Prettier |

---

## Instalación y Uso

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/YeremyGarrido/clone-barber.git
   cd clone-barber
   ```
2. Abrir en Visual Studio Code  
   ```bash
   code .
   ```
3. Visualizar el sitio  
   - Opción rápida: abrir `index.html` directamente en el navegador.  
   - Opción recomendada: usar la extensión **Live Server** de VS Code para vista en tiempo real.

---

## Personalización

**Colores**
Editar las variables principales en `css/styles.css`:
```css
:root {
  --primary-color: #d4a574;
  --secondary-color: #8b6f47;
  --dark-color: #1a1a1a;
}
```

**Contenido**
Modificar textos, servicios, precios y testimonios directamente en `index.html`.

**Imágenes**
Colocar las imágenes personalizadas en la carpeta `images/` y actualizar sus rutas en el HTML.

---

## Conexión con Backend

El formulario actualmente muestra una alerta al enviar. Para hacerlo funcional, puede conectarse con:
- FormSpree
- EmailJS
- Un servidor propio en Node.js o PHP

Para más detalles, consultar `docs/DEPLOYMENT.md`.

---

## Extensiones Recomendadas para VS Code

- Live Server  
- Prettier  
- Auto Rename Tag  
- CSS Peek  
- HTML CSS Support  

---

## Solución de Problemas

| Problema | Causa probable | Solución |
|-----------|----------------|-----------|
| Estilos no se aplican | Ruta incorrecta | Verificar `<link rel="stylesheet" href="css/styles.css">` |
| JavaScript no funciona | Ruta incorrecta o error en consola | Verificar `<script src="js/script.js"></script>` |
| Fuentes no cargan | Sin conexión a internet | Verificar acceso a Google Fonts |
| Imágenes no aparecen | Rutas mal escritas | Revisar nombres de archivos y extensión |

---

## Próximos Pasos

- Conectar el formulario a un backend real.  
- Integrar Google Maps.  
- Añadir sistema de reservas online.  
- Optimizar imágenes y SEO.  
- Agregar métricas o analítica (Google Analytics, Meta Pixel).  

---

## Licencia

Este proyecto es de uso libre para fines personales y comerciales. Se permite su modificación y distribución con atribución al autor original.

Creado por **Yeremy Garrido**  
Repositorio: [github.com/YeremyGarrido/clone-barber](https://github.com/YeremyGarrido/clone-barber)

---

