const express = require('express'); //method to import any package, here express is imported

//import userRouter
const userRouter = require('./routers/userRouter');
const addJobsRouter = require('./routers/addJobsRouter');
const profileRouter = require('./routers/profileRouter');
const companyRouter = require('./routers/companyRouter');
const subscriptionRouter = require('./routers/subscriptionRouter');
const {router}= require('./routers/util');


// const feedbackRouter = require('./routers/feedbackRouter');

const cors = require('cors'); //to allow request from frontend to backend
// const feedBackModel = require('./models/feedBackModel');

//initilizing express
const app = express();
const port = 5000; //can be anything at the place of 5000

//middlewares

app.use(
  cors({
    origin: ['http://localhost:3000']
  })
);

app.use(express.json()); //convert data from json to js
app.use('/user', userRouter); //sending request to userRouter
app.use('/add_jobs', addJobsRouter); //sending request to addJobsRouter
app.use('/profile', profileRouter); //sending request to addJobsRouter
app.use('/company', companyRouter); //sending request to addJobsRouter
app.use('/subscription', subscriptionRouter); //sending request to addJobsRouter
app.use('/util', router); //sending request to addJobsRouter

app.use(express.static('./static/uploads'));

//to start express server
app.listen(port, () => {
  console.log('express server started');
});