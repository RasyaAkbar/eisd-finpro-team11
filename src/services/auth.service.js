const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: {email} });

    if (!user) {
        throw new Error("Authentication failed. User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Authentication failed. Invalid credentials.");
    }

    const payload = { userId: user.id, role: user.role};

    // ini buat berapa lama access token itu bakal valid dalam detik
    const accessTtlSec = 60 * 60; // 1 jam
    // ini berapa lama refresh tokennya itu valiid dalam detik
    const refreshTtlSec = 60 * 60 * 24 * 7; // 7 hari

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: accessTtlSec });
    const refreshToken = jwt.sign({ ...payload, type: 'refresh' }, process.env.JWT_SECRET, {expiresIn: refreshTtlSec});

    return {
        user: { id: user.id, name: user.name, role: user.role },
        token, 
        expiresIn: accessTtlSec,
        refreshToken,
        refreshExpiresIn: refreshTtlSec
    };
}

exports.registerUser = async (name, email, password) => {
    // cek jika sudah ada user dengan email yang sama
    const existing = await User.findOne({ where: { email } });
    if (existing) {
        throw new Error('User already exists');
    }

    const hashed = await bcrypt.hash(password, 10);
    const created = await User.create({
        name,
        email,
        password: hashed
    });

    return { userId: created.id, name: created.name }
}