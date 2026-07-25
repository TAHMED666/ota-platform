const { User } = require('../models');

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'preferredCurrency', 'createdAt']
    });

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getProfile };
