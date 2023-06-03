const multer = require('multer');
const router = require('express').Router();
const { SMTPClient } = require('emailjs');
const nodemailer = require('nodemailer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const myStorage = multer({ storage: storage });

router.post('/uploadfile', myStorage.single('myfile'), (req, res) => {
  res.status(200).json({ status: 'success' });
});

const initMail = () => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'offcampus6583@gmail.com',
      pass: 'mcoectdjwoqtselk'
    }
  });
  return transporter;
};
const client = initMail();
const sendMail = (to, subject, html) => {
  client.sendMail(
    {
      from: 'offcampus6583@gmail.com',
      to,
      subject,
      html
    },
    (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully!', info.response);
      }
    }
  );
};

router.post('/sendmail', (req, res) => {
  const data = req.body;
  sendMail(data.to, data.subject, data.html);
  res.status(200).json({ message: 'mail sent successfully' });
});

router.post('/', (req, res) => {
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((data) => {
      console.log('Email Sent successfully..');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});
module.exports = router;
