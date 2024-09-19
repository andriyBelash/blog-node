import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import multer from 'multer';
import AppDataSource from './config/database.js';
import adminRoutes from './routes/admin.routes.js';
import uploadStorage from './modules/shared/utils/lib/storage.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// Глобальне middleware для обробки FormData та файлів
app.use((req, res, next) => {
  uploadStorage.any()(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Невідома помилка при обробці форми' });
    }
    next();
  });
});

// Middleware для обробки даних форми
app.use((req, res, next) => {
  if (req.files) {
    req.body.files = req.files;
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статичний маршрут для доступу до завантажених файлів
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, cors(corsOptions), express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 3000;

// Використання маршрутів
app.use('/api/admin', adminRoutes);

// Запуск сервера
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Сервер запущено на порту ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Помилка під час ініціалізації Data Source:", err);
  });

export default app;