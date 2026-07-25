const { Review } = require('../models');

const createReview = async (req, res, next) => {
  try {
    const review = await Review.create({
      userId: req.user.id,
      entityType: req.body.entityType,
      entityId: req.body.entityId,
      rating: req.body.rating,
      comment: req.body.comment
    });

    return res.status(201).json(review);
  } catch (error) {
    return next(error);
  }
};

const listReviews = async (req, res, next) => {
  try {
    const { entityType, entityId } = req.query;
    const where = {};

    if (entityType) where.entityType = entityType;
    if (entityId) where.entityId = entityId;

    const reviews = await Review.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json(reviews);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createReview, listReviews };
