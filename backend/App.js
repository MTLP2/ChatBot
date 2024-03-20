const express = require('express');
const helmet = require('helmet');
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express();

app.use(helmet());
app.use(express.json())
app.use(cors());


const transporter = nodemailer.createTransport({
  host: 'mail.matheolopes.com', // Remplace par ton domaine
  port: 587, // Port SMTP standard pour la soumission de mails
  secure: false, // Pour le port 587, cette option doit être false
  auth: {
    user: '', // Ton adresse email complète
    pass: '' // Ton mot de passe
  },
  tls: {
    rejectUnauthorized: false // Ajoute cette ligne pour ignorer les erreurs de certificat
  }
});

app.post('/api/send', (req, res) => {
  const {email, message } = req.body;

  const mailOptions = {
      from: email,
      to: '', // L'email destinataire (peut être le même que l'expéditeur)
      subject: 'Nouveau message du chatbot',
      text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Erreur d\'envoi de mail:', error);
          res.status(500).send('Erreur lors de l\'envoi du mail');
      } else {
          console.log('Email envoyé:', info.response);
          res.status(200).send('Email envoyé avec succès');
      }
  });
});

app.listen(5174, ()=>{
  console.log("Backend server is running!");
})


module.exports = app;