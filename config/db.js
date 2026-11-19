const mongoose = require('mongoose');
async function connectToDb () {
    await mongoose.connect(`mongodb+srv://Gaurav:atlas121@cluster0.ntjmjxh.mongodb.net/SampleDB`);
}

module.exports = connectToDb;