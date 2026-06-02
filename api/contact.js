// Firebase Cloud Function for handling contact form submissions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')();

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

exports.handleContact = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
      }

      const {name, email, message} = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({error: 'Missing required fields'});
      }

      if (!validateEmail(email)) {
        return res.status(400).json({error: 'Invalid email'});
      }

      const docRef = await admin.firestore().collection('messages').add({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        read: false
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Message Received - IRON WILLZ',
        html: '<h2>Thank you for reaching out!</h2>'
      });

      return res.status(200).json({success: true, id: docRef.id});
    } catch (error) {
      return res.status(500).json({error: 'Server error'});
    }
  });
});
