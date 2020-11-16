const { User } = require('../models/User');

const createUser = async (newUser) => {
    try {
        const userCreated = await User.create(newUser);
        console.log(userCreated);
        return userCreated;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createUser
}
