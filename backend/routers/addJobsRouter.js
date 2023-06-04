// const express = require('express');       

const {Router} = require('express');       // importing Router from express

const Model = require('../models/addJobsModel');  //importing model from userModel
const { sendMail, getMailTemplate } = require('./util');
const subscriptionModel = require('../models/subscriptionModel');


//initilizing express
// const router = express.Router();

const getSubscribedUserEmails = (companyId, cb) => {
    subscriptionModel.find({company: companyId})
    .populate('user')
    .then((result) => {
        const emails = result.map((item) => item.user.email);
        cb(emails);
    })
    .catch((err) => {
        console.log(err);
        cb([]);
    })
}

const router = Router();

router.post('/add', (req, res) => {
    console.log(req.body);
    const {companyData, driveData} = req.body;
    // sendMail(data.to, data.subject, getMailTemplate(companyData, driveData));

    new Model(driveData).save()      //saving data in database
    .then((result) => {
        getSubscribedUserEmails(companyData._id, (emails) => {
            emails.forEach((email) => {
                console.log(email);
                sendMail(email, 'Off Campus Drive Updates', getMailTemplate(companyData, driveData));
            })
        })
        res.json(result)   //converting result into json
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });

    // res.send('response from /add in user router')
});


//Reading Data
//reading mostly use get method
router.get('/getall', (req,res) => {
    Model.find({}).populate('user')
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})


// router.get('/getbyemail/:useremail', (req,res) => {
//     Model.find({email : req.params.useremail})
//     .then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });
//using colon means it is url parameter.
//post use body, get use params


// router.post('/authenticate', (req, res) => {
//     console.log(req.body)

//     Model.findOne(req.body)
//     .then((result) => {
//         if(result){
//             res.status(200).json(result);          //if credential match
//         }
//         else{
//             res.status(401).json({status : 'failed'})     //if any credential did not match
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// })



//delete data from database
//here delete method is used

router.delete('/delete/:userid', (req,res) => {
    Model.findByIdAndDelete(req.params.userid)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/getbyid/:userid', (req, res) => {
    Model.findById(req.params.userid)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/getbyuser/:CompId', (req, res) => {
    Model.find({user : req.params.CompId})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})


router.put('/update/:userid', (req, res) => {

    Model.findByIdAndUpdate(req.params.userid, req.body)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });

})





module.exports = router;                   //exporting router