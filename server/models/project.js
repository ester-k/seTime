const mongoose = require('mongoose');
const Project = mongoose.model('projects', new mongoose.Schema({
    key:{
        type:String
    },
       name: {
        type: String
    },
    startDate: {
        type: Date
    }}));
module.exports = {
    Project
}
