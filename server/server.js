/**
 * @file server.js
 * @description Servidor principal de la aplicación - La Diarquía Barbería
 * @author La Diarquía Backend Team
 */

// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// ==============================================
// MIDDLEWARE DE SEGURIDAD
// ==============================================

// Si corre detrás de un proxy (ej. Vercel/Render/Fly), confiar en el proxy para IPs reales
app.set('trust proxy', 1);

// Headers de seguridad HTTP
app.use(helmet());

// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*', // En producción, especificar el dominio exacto
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// ==============================================
// MIDDLEWARE DE APLICACIÓN
// ==============================================

// Parser de JSON
app.use(express.json());

// Parser de URL-encoded (para formularios)
app.use(express.urlencoded({ extended: true }));

// ==============================================
// RATE LIMITING
// ==============================================

// Rate limiter global (previene ataques de fuerza bruta)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 peticiones por IP en 15 minutos
    message: {
        success: false,
        message: 'Demasiadas solicitudes desde esta IP, por favor intenta más tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(globalLimiter);

// Rate limiter específico para bookings (previene spam de reservas)
const bookingLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5, // máximo 5 reservas por hora por IP
    message: {
        success: false,
        message: 'Has excedido el límite de reservas permitidas por hora. Por favor, intenta más tarde o contáctanos directamente.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Mensaje más amigable en desarrollo
    skipFailedRequests: false,
});

// ==============================================
// RUTAS
// ==============================================

// Importar rutas de reservas (RUTA CORREGIDA)
const bookingRoutes = require('./src/api/routes/bookings.routes.js');

// Ruta de health check (para verificar que el servidor está funcionando)
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Montar las rutas de la API de reservas
app.use('/api/bookings', bookingLimiter, bookingRoutes);

// Ruta 404 - No encontrado
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.originalUrl
    });
});

// ==============================================
// MANEJO DE ERRORES GLOBAL
// ==============================================

app.use((err, req, res, next) => {
    console.error('❌ Error no manejado:', err);
    
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Error interno del servidor' 
            : err.message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// ==============================================
// INICIAR SERVIDOR
// ==============================================

app.listen(port, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🔥  LA DIARQUÍA - SERVIDOR BACKEND  🔥');
    console.log('='.repeat(60));
    console.log(`✅ Servidor ejecutándose en: http://localhost:${port}`);
    console.log(`📅 Fecha de inicio: ${new Date().toLocaleString('es-CL')}`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 CORS habilitado para: ${corsOptions.origin}`);
    console.log(`🛡️  Rate limiting activo`);
    console.log(`📡 Endpoints disponibles:`);
    console.log(`   - GET  /health`);
    console.log(`   - POST /api/bookings`);
    console.log('='.repeat(60) + '\n');
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM recibido. Cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT recibido. Cerrando servidor...');
    process.exit(0);
});

module.exports = app;
