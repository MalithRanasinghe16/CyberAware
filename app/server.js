
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());


// const transporter = nodemailer.createTransport({
//   service: 'gmail', 
//   auth: {
//     user: 'your-email@gmail.com', 
//     pass: 'your-email-password' 
//   }
// });

// // Endpoint to send OTP
// app.post('/send-otp', (req, res) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000); 

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is: ${otp}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       return res.status(500).send('Error sending email.');
//     }
//     console.log('Email sent:', info.response);
//     res.status(200).send('OTP sent to your email.');
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
