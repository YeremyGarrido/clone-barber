#!/usr/bin/env node

/**
 * Script de validación pre-deployment
 * Verifica que todas las configuraciones estén correctas antes de desplegar
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando configuración del proyecto...\n');

let hasErrors = false;
let hasWarnings = false;

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

function error(message) {
    console.log(`${colors.red}❌ ERROR: ${message}${colors.reset}`);
    hasErrors = true;
}

function warning(message) {
    console.log(`${colors.yellow}⚠️  WARNING: ${message}${colors.reset}`);
    hasWarnings = true;
}

function success(message) {
    console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function info(message) {
    console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

// ============================================
// 1. VERIFICAR ARCHIVOS ESENCIALES
// ============================================
console.log('📁 Verificando archivos esenciales...\n');

const requiredFiles = [
    'package.json',
    'server.js',
    '.env.example',
    '.gitignore',
    'Dockerfile',
    'fly.toml',
    'src/api/routes/bookings.routes.js',
    'src/controllers/bookings.controller.js',
    'src/services/booking.service.js',
    'src/services/googleCalendar.service.js',
    'src/services/whatsapp.service.js',
    'src/services/validation.service.js',
];

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        success(`Archivo encontrado: ${file}`);
    } else {
        error(`Archivo faltante: ${file}`);
    }
});

// ============================================
// 2. VERIFICAR PACKAGE.JSON
// ============================================
console.log('\n📦 Verificando package.json...\n');

try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Verificar scripts
    if (packageJson.scripts && packageJson.scripts.start) {
        success('Script "start" definido');
    } else {
        error('Falta script "start" en package.json');
    }

    // Verificar dependencias críticas
    const requiredDeps = ['express', 'cors', 'dotenv', 'helmet', 'googleapis', 'axios'];
    requiredDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            success(`Dependencia encontrada: ${dep}`);
        } else {
            error(`Dependencia faltante: ${dep}`);
        }
    });

    // Verificar engines
    if (packageJson.engines && packageJson.engines.node) {
        success(`Node version especificada: ${packageJson.engines.node}`);
    } else {
        warning('No se especificó versión de Node.js en engines');
    }

} catch (err) {
    error(`Error leyendo package.json: ${err.message}`);
}

// ============================================
// 3. VERIFICAR .ENV.EXAMPLE
// ============================================
console.log('\n🔐 Verificando .env.example...\n');

try {
    const envExample = fs.readFileSync('.env.example', 'utf8');
    
    const requiredEnvVars = [
        'NODE_ENV',
        'PORT',
        'FRONTEND_URL',
        'WHATSAPP_PHONE_NUMBER_ID',
        'WHATSAPP_ACCESS_TOKEN',
        'GOOGLE_CLIENT_EMAIL',
        'GOOGLE_PRIVATE_KEY',
        'GOOGLE_CALENDAR_ID',
    ];

    requiredEnvVars.forEach(varName => {
        if (envExample.includes(varName)) {
            success(`Variable de entorno documentada: ${varName}`);
        } else {
            error(`Variable faltante en .env.example: ${varName}`);
        }
    });

} catch (err) {
    error(`Error leyendo .env.example: ${err.message}`);
}

// ============================================
// 4. VERIFICAR .GITIGNORE
// ============================================
console.log('\n🚫 Verificando .gitignore...\n');

try {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    
    const mustIgnore = ['.env', 'node_modules/', '.secrets.env', 'credentials.json'];
    
    mustIgnore.forEach(pattern => {
        if (gitignore.includes(pattern)) {
            success(`Patrón ignorado correctamente: ${pattern}`);
        } else {
            error(`Patrón faltante en .gitignore: ${pattern}`);
        }
    });

} catch (err) {
    error(`Error leyendo .gitignore: ${err.message}`);
}

// ============================================
// 5. VERIFICAR ARCHIVOS SENSIBLES NO COMMITEADOS
// ============================================
console.log('\n🔒 Verificando archivos sensibles...\n');

const sensitiveFiles = ['.env', '.secrets.env', 'credentials.json'];

sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
        warning(`Archivo sensible encontrado: ${file} - NO lo subas al repositorio`);
    } else {
        success(`Archivo sensible no encontrado (correcto): ${file}`);
    }
});

// ============================================
// 6. VERIFICAR DOCKERFILE
// ============================================
console.log('\n🐳 Verificando Dockerfile...\n');

try {
    const dockerfile = fs.readFileSync('Dockerfile', 'utf8');
    
    if (dockerfile.includes('FROM node:')) {
        success('Base image de Node.js definida');
    } else {
        error('Falta base image de Node.js');
    }

    if (dockerfile.includes('EXPOSE')) {
        success('Puerto expuesto en Dockerfile');
    } else {
        warning('No se especifica puerto EXPOSE en Dockerfile');
    }

    if (dockerfile.includes('CMD') || dockerfile.includes('ENTRYPOINT')) {
        success('Comando de inicio definido');
    } else {
        error('Falta comando de inicio (CMD o ENTRYPOINT)');
    }

} catch (err) {
    error(`Error leyendo Dockerfile: ${err.message}`);
}

// ============================================
// 7. VERIFICAR FLY.TOML
// ============================================
console.log('\n✈️  Verificando fly.toml...\n');

try {
    const flyToml = fs.readFileSync('fly.toml', 'utf8');
    
    if (flyToml.includes('internal_port = 3000')) {
        success('Puerto interno configurado correctamente (3000)');
    } else {
        warning('Verifica que internal_port coincida con tu servidor');
    }

    if (flyToml.includes('[http_service]')) {
        success('Configuración de servicio HTTP encontrada');
    } else {
        error('Falta configuración [http_service]');
    }

    if (flyToml.includes('[checks.health]')) {
        success('Health check configurado');
    } else {
        warning('No se configuró health check');
    }

} catch (err) {
    error(`Error leyendo fly.toml: ${err.message}`);
}

// ============================================
// 8. VERIFICAR ESTRUCTURA DE SERVICIOS
// ============================================
console.log('\n🔧 Verificando servicios...\n');

const services = [
    'src/services/booking.service.js',
    'src/services/googleCalendar.service.js',
    'src/services/whatsapp.service.js',
    'src/services/validation.service.js',
];

services.forEach(service => {
    try {
        const content = fs.readFileSync(service, 'utf8');
        
        // Verificar que use variables de entorno
        if (content.includes('process.env.')) {
            success(`${path.basename(service)} usa variables de entorno`);
        } else {
            warning(`${path.basename(service)} no parece usar variables de entorno`);
        }

        // Verificar exports
        if (content.includes('module.exports')) {
            success(`${path.basename(service)} exporta funciones`);
        } else {
            error(`${path.basename(service)} no exporta nada`);
        }

    } catch (err) {
        error(`Error leyendo ${service}: ${err.message}`);
    }
});

// ============================================
// 9. VERIFICAR SERVER.JS
// ============================================
console.log('\n🚀 Verificando server.js...\n');

try {
    const serverJs = fs.readFileSync('server.js', 'utf8');
    
    const checks = [
        { pattern: 'require(\'dotenv\')', message: 'Carga dotenv' },
        { pattern: 'require(\'express\')', message: 'Usa Express' },
        { pattern: 'require(\'cors\')', message: 'Configura CORS' },
        { pattern: 'require(\'helmet\')', message: 'Usa Helmet' },
        { pattern: 'app.listen', message: 'Inicia el servidor' },
        { pattern: 'process.env.PORT', message: 'Usa puerto configurable' },
        { pattern: '/health', message: 'Tiene endpoint de health check' },
    ];

    checks.forEach(check => {
        if (serverJs.includes(check.pattern)) {
            success(check.message);
        } else {
            warning(`Posible problema: ${check.message} no encontrado`);
        }
    });

} catch (err) {
    error(`Error leyendo server.js: ${err.message}`);
}

// ============================================
// 10. RESUMEN FINAL
// ============================================
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE VALIDACIÓN');
console.log('='.repeat(60) + '\n');

if (!hasErrors && !hasWarnings) {
    console.log(`${colors.green}✨ ¡TODO PERFECTO! El proyecto está listo para desplegar.${colors.reset}\n`);
    info('Próximos pasos:');
    console.log('  1. Configura las variables de entorno en Fly.io');
    console.log('  2. Ejecuta: fly deploy');
    console.log('  3. Verifica con: fly logs\n');
    process.exit(0);
} else if (hasErrors) {
    console.log(`${colors.red}❌ Se encontraron ERRORES CRÍTICOS. Corrígelos antes de desplegar.${colors.reset}\n`);
    process.exit(1);
} else if (hasWarnings) {
    console.log(`${colors.yellow}⚠️  Se encontraron ADVERTENCIAS. Revísalas antes de desplegar.${colors.reset}\n`);
    info('Puedes continuar, pero se recomienda resolver las advertencias.');
    process.exit(0);
}
