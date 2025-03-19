import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const {
    name,
    phone,
    address,
    rut,
    email,
    marca,
    modelo,
    matricula,
    kms,
    talla,
    inspeccion,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'ju.alvareze@gmail.com',
    subject: 'Nueva solicitud de mantención',
    text: `
      Nueva solicitud de mantención:
      - Nombre: ${name}
      - RUT: ${rut}
      - Correo: ${email}
      - Teléfono: ${phone}
      - Dirección: ${address}
      - Marca: ${marca}
      - Modelo: ${modelo}
      - Patente: ${matricula}
      - Kilómetros: ${kms}
      - Talla: ${talla}
      - Inspección: ${inspeccion}
    `,
    html: `
      <h1>Nueva solicitud de mantención</h1>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>RUT:</strong> ${rut}</li>
        <li><strong>Correo:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone}</li>
        <li><strong>Dirección:</strong> ${address}</li>
        <li><strong>Marca:</strong> ${marca}</li>
        <li><strong>Modelo:</strong> ${modelo}</li>
        <li><strong>Patente:</strong> ${matricula}</li>
        <li><strong>Kilómetros:</strong> ${kms}</li>
        <li><strong>Talla:</strong> ${talla}</li>
        <li><strong>Inspección:</strong> ${inspeccion}</li>
      </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el correo' });
  }
});

// Servidor escuchando en el puerto 5000 o el definido en env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
