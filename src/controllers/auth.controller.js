const authService = require("../services/auth.service");

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
    
        // validasi input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan password harus diisi"
            })
        }

        // panggil service untuk login
        const result = await authService.loginUser(email, password);

        res.status(200).json({
            status: "ok",
            statusCode: 200,
            message: "Login berhasil",
            data: result,
        });
    } catch (error) {
        if (error.message.includes("Authentication failed")) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Nama, email, dan password harus diisi",
            });
        }

        const result = await authService.registerUser(name, email, password);

        return res.status(201).json({
            status: "ok",
            statusCode: 201,
            message: "Registrasi berhasil",
            data: result,
        })
    } catch (error) {
        if (error.message && error.message.includes("already exists")) {
            return res.status(403).json({ message: error.message });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};