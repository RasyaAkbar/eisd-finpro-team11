const { UserChallenge, User, Badge, UserBadge } = require('../models');

exports.completeChallenge = async (req, res) => {
  const { challengeId } = req.body;
  const userId = req.user.id;

  // Find the user's challenge attempt
  const userChallenge = await UserChallenge.findOne({ where: { userId, challengeId } });
  if (!userChallenge) {
    return res.status(404).json({ message: 'Challenge not found for user.' });
  }
  if (userChallenge.status === 'completed') {
    return res.status(400).json({ message: 'You have already completed this challenge.' });
  }

  userChallenge.status = 'completed';
  userChallenge.completedAt = new Date();
  await userChallenge.save();

  // Check if this challenge grants a badge
  const badgeToGrant = await Badge.findOne({ where: { challengeId } });
  if (badgeToGrant) {
    await UserBadge.findOrCreate({
      where: { userId, badgeId: badgeToGrant.id },
      defaults: { grantedAt: new Date() }
  });
  }

  res.json({ message: 'Challenge completed! Badge granted if eligible.' });
}

exports.takeChallenge = async (req, res) => {
  const { challengeId } = req.body;
  const userId = req.user.id;

  // Check if already taken
  const existing = await UserChallenge.findOne({ where: { userId, challengeId } });
  if (existing) {
    return res.status(400).json({ message: 'You have already taken this challenge.' });
  }

  await UserChallenge.create({
    userId,
    challengeId,
    status: 'in_progress'
  });

  res.json({ message: 'Challenge started!' });
}