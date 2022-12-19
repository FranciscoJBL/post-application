import * as nanoid from "nanoid";
import prisma from './prisma';

export default async function createPost(data: { email: string, password: string }) {
  const newPost = await prisma.user.create({
    data: {
        id: nanoid.nanoid(),
        email: data.email,
        password: data.password,
      }
  });

  await prisma.$disconnect();
  return newPost;
}