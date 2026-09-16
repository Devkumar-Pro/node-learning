const users = require('../data/users');
const ApiError = require('../utils/ApiError');
const { validateUserId, validateUserName } = require('../validators/user.validator');

const getUsers = () => {
    return users;
};

const getUserById = (id) => {
    const userId = validateUserId(id);

    const user = users.find(
        (item) => item.id === userId
    );

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return user;
};


const createUser = (data) => {
    const name = validateUserName(data.name);

    const user = {
        id: users.length
            ? users[users.length - 1].id + 1
            : 1,
        name
    };

    users.push(user);

    return user;
};

const updateUser = (id, data) => {
    const user = getUserById(id);

    if (data.name !== undefined) {
        user.name = data.name;
    }

    return user;
};

const deleteUser = (id) => {
    const user = getUserById(id);

    const index = users.indexOf(user);

    users.splice(index, 1);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};