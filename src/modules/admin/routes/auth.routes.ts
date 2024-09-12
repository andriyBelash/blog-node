import express, { Request, Response } from 'express';

const authRouter = express.Router();

authRouter.get('/test', (req: Request, res: Response) => {
  res.send('Test route works!');
});

export default authRouter;
