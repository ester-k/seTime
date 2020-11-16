const mongoose = require('mongoose');

const connect = () => {
        mongoose.connect('mongodb://localhost:27017/SetTimeDB',
        { useNewUrlParser: true, useUnifiedTopology: true })

}

module.exports = {
    connect
}