const mongoose = require('mongoose');
const connect = () => {
        mongoose.connect('mongodb://localhost:27017/setTimeDB',
        { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });
}

module.exports = {
    connect
}