const validateUserName = (name) => {
    if (name === undefined) {
        throw new Error('Name is required');
    }

    if (typeof name !== 'string') {
        throw new Error('Name must be a string');
    }

    if (!name.trim()) {
        throw new Error('Name cannot be empty');
    }

    return name.trim();
};

const validateUserId = (id) => {
    const userId = Number(id);

    if (!Number.isInteger(userId) || userId <= 0) {
        throw new Error('Invalid user id');
    }

    return userId;
};

module.exports = {
    validateUserName,
    validateUserId
};