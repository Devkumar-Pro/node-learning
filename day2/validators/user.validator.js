const validateCreateUser = (req, res, next) => {
    const { name } = req.body;

    if (name === undefined) {
        return res.status(400).json({
            message: 'Name is required',
            data: null
        });
    }

    if (typeof name !== 'string') {
        return res.status(400).json({
            message: 'Name must be a string',
            data: null
        });
    }

    if (!name.trim()) {
        return res.status(400).json({
            message: 'Name cannot be empty',
            data: null
        });
    }

    next();
};

const validateUserId = (req, res, next) => {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            message: 'Invalid user id',
            data: null
        });
    }

    next();
};

const validateUpdateUser = (req, res, next) => {
    const { name } = req.body;

    // PATCH allows partial updates,
    // so name can be omitted.
    if (name === undefined) {
        return next();
    }

    if (typeof name !== 'string') {
        return res.status(400).json({
            message: 'Name must be a string',
            data: null
        });
    }

    if (!name.trim()) {
        return res.status(400).json({
            message: 'Name cannot be empty',
            data: null
        });
    }

    next();
};

module.exports = {
    validateCreateUser,
    validateUserId,
    validateUpdateUser
};