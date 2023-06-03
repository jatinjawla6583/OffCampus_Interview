const mongoose = require('mongoose');          //write req and press enter

const url = `mongodb+srv://jatinjawla8:1234@cluster0.m8ohbod.mongodb.net/OffCampus_Drive?retryWrites=true&w=majority`;

mongoose.connect(url)
//write thenc and press enter
.then((result) => {
    console.log('database connected')
})   
.catch((err) => {
    console.log(err);
});

//from line 8 to 15 are in same line, dont use semicolon in line 8.

module.exports = mongoose;               //to export mongoose
