const express = require('express');
const db = require('./src/models');
const userRoutes = require('./src/routes/user.routes');
const app = express();
// Middleware untuk mem-parsing request body JSON
app.use(express.json());
// Middleware untuk mem-parsing request body URL-encoded
app.use(express.urlencoded({ extended: true }));
// Route sederhana untuk pengujian awal
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API aplikasi.' });
});
// Mendaftarkan user routes dengan prefiks /api/users
app.use('/api/users', userRoutes);
// db.sequelize.sync();
// Sinkronisasi database (opsional, lebih baik menggunakan migrasi di produksi)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port $PORT.`);
});