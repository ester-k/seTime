const user = require('../models/User');
const usersService = require('../services/usersService');
const createUser = async (req, res) => {
    try {
        const user = req.body;
        const createdUser = await usersService.createUser(user);
        return res.status(200).json(createdUser);
    }
    catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}
const getUser = async (req, res) => {
    try {

        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    getUser,
    createUser
}