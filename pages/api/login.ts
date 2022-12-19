import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import generateToken from '../../lib/generateToken';
import { registerHandler } from './register';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if ( ! user) {
      const registerResponse = await registerHandler(email, password);
      if (registerResponse.success) {
        res.status(200).json({ token: registerResponse.token, userId: registerResponse.userId });
      } else {
        res.status(401).json({ error: registerResponse.error });
      }
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user.id);
      res.status(200).json({ token, userId: user.id });
    } else {
      res.status(401).json({ error: 'Invalid email/password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
};