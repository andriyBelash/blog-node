import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import AppDataSource from './config/database';

import adminRoutes from './routes/admin.routes';
import webRoutes from './routes/web.routes';

const app = express();

// Налаштування CORS
const corsOptions = {
  origin: 'http://localhost:5173', // URL вашого фронтенду
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/admin', adminRoutes);
// app.use('/api/web', webRoutes);

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