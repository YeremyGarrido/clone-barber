/**
 * @file bookings.controller.js
 * @description Controlador para gestionar las reservas de citas
 * @author La Diarquía Backend Team
 */

const bookingService = require('../services/booking.service.js');
const { validateBookingData } = require('../services/validation.service.js');

/**
 * Crea una nueva reserva
 * @param {Object} req - Objeto de petición Express
 * @param {Object} res - Objeto de respuesta Express
 */
const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        console.log('📅 Procesando nueva reserva:', bookingData);

        // 1. Validar datos de entrada usando el servicio de validación
        validateBookingData(bookingData);

        // 2. Procesar la reserva usando el servicio de booking
        const result = await bookingService.processNewBooking(bookingData);

        // 3. Responder al frontend con éxito
        res.status(201).json({
            success: true,
            message: 'Reserva creada exitosamente',
            data: result
        });

    } catch (error) {
        console.error('❌ Error al crear reserva:', error);

        // Manejo de errores de validación
        if (error.statusCode === 400) {
            return res.status(400).json({
                success: false,
                message: error.message,
                details: error.details || undefined
            });
        }

        // Manejo de errores de servicios externos
        if (error.message.includes('Google Calendar')) {
            return res.status(503).json({
                success: false,
                message: 'Error al conectar con Google Calendar. Por favor, intenta más tarde.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }

        if (error.message.includes('WhatsApp')) {
            return res.status(503).json({
                success: false,
                message: 'Error al enviar confirmación por WhatsApp. La cita fue agendada pero no se pudo enviar el mensaje.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }

        // Error genérico
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al procesar la reserva',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    createBooking
};
