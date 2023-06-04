const multer = require('multer');
const router = require('express').Router();
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

const getMailTemplate = (companyData, driveData) => {
  return `<div style="padding: 100px;">
  <h1 style="text-align: center;">OffCampus Drive Updates</h1>

  <div style="border: 2px solid black;border-radius: 10px;padding: 50px;">
      <p>Company Details</p>
      <div style="margin-left: 30px;">
          <h3>Company Name : <span>${companyData.name}</span></h3>
          <h3>Company Website : <span>${companyData.officalWebsite}</span></h3>
          
      </div>
      <hr />
      <p>Drive Details</p>
      <div style="margin-left: 30px;">
          <h3>Job Type : <span>${driveData.jobType}</span></h3>
          <h3>Job Designation : <span>${driveData.designation}</span></h3>
          <h3>Eligibility : <span>${driveData.course_branch}</span></h3>
          <h3>Salary : <span>${driveData.salary}</span></h3>
          <h3>Drive Date : <span>${new Date(driveData.lastDate).toLocaleDateString()}</span></h3>
          <h3>Drive Location : <span>${driveData.interviewLocation}</span></h3>
          <h3>Last Date To Apply : <span>${new Date(driveData.lastDate).toLocaleDateString()}</span></h3>
          <br />
          <a href="${
            driveData.reg_Link
          }" style="color : white; background-color: crimson; padding: 10px 20px;font-size: 1.1em;border: none;border-radius: 5px;text-decoration: none;">Apply Here</a>
          
      </div>
  </div>  
</div>`;
};

module.exports = { router, sendMail, getMailTemplate };
