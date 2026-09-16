const userService = require('../services/user.service');

const getUsers = (req, res) => {
    const users = userService.getUsers();

    res.json({
        message: 'Success',
        data: users
    });
};

const getUserById = (req, res) => {
    const user = userService.getUserById(req.params.id);

    res.json({
        message: 'Success',
        data: user
    });
};

const createUser = (req, res) => {
    const user = userService.createUser(req.body);

    res.status(201).json({
        message: 'Success',
        data: user
    });
};

const updateUser = (req, res) => {
    const user = userService.updateUser(
        req.params.id,
        req.body
    );

    res.json({
        message: 'Success',
        data: user
    });
};

const deleteUser = (req, res) => {
    userService.deleteUser(req.params.id);

    res.json({
        message: 'Success',
        data: null
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};