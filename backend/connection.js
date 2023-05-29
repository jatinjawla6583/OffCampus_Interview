const mongoose = require('mongoose');          //write req and press enter


const dbName = 'OffCampus_Interview';       //no space between name

const url = `mongodb+srv://ashutoshshubham:ashutosh@cluster0.cqjsjz0.mongodb.net/${dbName}?retryWrites=true&w=majority`;

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
