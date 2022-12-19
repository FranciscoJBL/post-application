import bcrypt from 'bcrypt';
import generateToken from '../../lib/generateToken';
import createUser from '../../lib/createUser';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
        res.status(401).json({ error: 'User already exists' });
        return;
    }

    const registerResponse = await registerHandler(email, password);
    if (registerResponse.success) {
        res.status(200).json({ token: registerResponse.token, userId: user.id });
    } else {
        res.status(401).json({ error: registerResponse.error, userId: user.id });
    }
}

type RegisterResult = {
    success: boolean;
    error: string | null;
    token: string | null;
    userId: string | null;
}

export async function registerHandler(
    email: string, password: string
) : Promise<RegisterResult> {
  try {
      // Please don't make questions about this regex. 
      // It has been passed by generations of retired psychopath developers.
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        return {success: false, error:'invalid email', token: null, userId: null};
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser({ 
        email: email, password: hashedPassword 
      });
      return {success: true, error:null, token:  generateToken(newUser.id), userId: newUser.id};
  } catch (error) {
        return {success: false, error:'Something went wrong.', token: null, userId: null};
  }
};