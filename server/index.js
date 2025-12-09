// server/index.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Permite conexiones desde el frontend
app.use(express.json()); // Permite recibir JSON en el body

// Configuración del transporte de correo (Ejemplo con Gmail)
// NOTA: Para Gmail necesitas una "Contraseña de Aplicación", no tu contraseña normal.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación
  }
});

// Ruta para recibir la cita
app.post('/api/citas', async (req, res) => {
  const { nombre, dui, telefono, correo, tramite, fecha } = req.body;

  try {
    // Configurar el email que te llegará a ti
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'tu_correo_personal@gmail.com', // A dónde quieres que llegue la alerta
      subject: `Nueva Solicitud de Cita: ${tramite}`,
      html: `
        <h3>Detalles del Cliente</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>DUI:</strong> ${dui}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Trámite:</strong> ${tramite}</p>
        <p><strong>Fecha Preferida:</strong> ${fecha}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('Correo enviado exitosamente');
    res.status(200).json({ message: 'Cita agendada con éxito' });

  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error en el servidor al procesar la cita' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});