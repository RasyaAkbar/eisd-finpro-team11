const db = require('../models');
const User = db.User; // Mengakses model User
const bcrypt = require('bcrypt');
const saltRounds = 10; // Nilai awal yang baik
 const AppError = require('../utils/AppError');


exports.findUserById = async (id) => {
    if (!id) return null;
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } }); // findByPk adalah singkatan dari findByPrimaryKey
    return user;
}

exports.updateUser = async (id, updateData) => {
    const [num] = await User.update(updateData, {
        where: { id: id }
    });

    if (num == 1) {
        // Jika update berhasil, ambil dan kembalikan data terbaru
        const updatedUser = await User.findByPk(id);
        return updatedUser;
    } else {
        throw new Error(`Tidak dapat memperbarui pengguna dengan id=${id}. Mungkin pengguna tidak ditemukan`);
    }
};

exports.deleteUser = async (id) => {
    const num = await User.destroy({
        where: { id: id }
    });
    if (num != 1) {
        throw new Error(`Tidak dapat menghapus pengguna dengan id=${id}. Mungkin pengguna tidak ditemukan`);
    }
    // Tidak perlu mengembalikan apa pun karena penghapusan berhasil
};