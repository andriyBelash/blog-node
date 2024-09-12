// routes/admin.routes.ts
import express from 'express';
import authRouter from '../modules/admin/routes/auth.routes.js';

const router = express.Router();

router.use('/auth', authRouter);

export default router;