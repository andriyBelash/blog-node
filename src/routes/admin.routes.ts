// routes/admin.routes.ts
import express from 'express';
import authRouter from '../modules/admin/routes/auth.routes.js';
import profileRouter from '../modules/admin/routes/user.routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', profileRouter);

export default router;