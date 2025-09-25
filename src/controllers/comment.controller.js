const db = require('../models');
const Comment = db.Comment;

exports.create = async (req, res) => {
    try {
        const { content, moduleId } = req.body;
        const userId = req.user.id; // assuming user is authenticated

        if (!content || !moduleId) {
            return res.status(400).json({ message: "Content and moduleId are required." });
        }

        const comment = await Comment.create({ content, userId, moduleId });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};