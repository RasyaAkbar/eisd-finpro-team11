const express = require('express');
const db = require('./src/models');
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const commentRoutes = require('./src/routes/comment.routes');
const challengeRoutes = require('./src/routes/challenge.route');
const { swaggerUi, swaggerSpec } = require('./src/swagger');

const app = express();
// Middleware untuk mem-parsing request body JSON
app.use(express.json());
// Middleware untuk mem-parsing request body URL-encoded
app.use(express.urlencoded({ extended: true }));
// Middleware untuk Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Route sederhana untuk pengujian awal
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API aplikasi.' });
});
// Mendaftarkan user routes dengan prefiks /api/users

app.use('/api/comments', commentRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
// db.sequelize.sync();
// Sinkronisasi database (opsional, lebih baik menggunakan migrasi di produksi)
const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    console.log(`Server berjalan di port ${PORT}.`);
});