const userService = require('../services/user.service');


exports.findOne = async (req, res) => {
    try {

        const userId = req.params.id;
        const user = await userService.findUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `Pengguna dengan id=${userId} tidak ditemukan.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await userService.updateUser(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.status(204).send(); // 204 No Content adalah respons standar untuk delete yang sukses
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};