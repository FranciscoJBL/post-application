import * as nanoid from "nanoid";
import prisma from './prisma';

export default async function createPost(data: { postName: string, postDescription: string, userId: string }) {
  const newPost = await prisma.post.create({
    data: {
        id: nanoid.nanoid(),
        name: data.postName,
        description: data.postDescription,
        isPublic: true,
        user: {
            connect: {
                id: data.userId
            }
        }
      }
  });
  
  await prisma.$disconnect();
  return newPost;
}