import prisma from "./prisma";

export const fetchPost: any = async (ctx: { params: { id: any; }; }) => {
    const rawPost = await prisma.post.findUnique({
        where: {
            id: String(ctx.params?.id),
        },
        include: {
            user: {
                select: { email: true },
            },
        },
    });
    await prisma.$disconnect();
    // This approach fix the issue with isSerializable method on nextjs lib, 
    // For more info, please check: https://github.com/vercel/next.js/issues/13209
    return JSON.parse(JSON.stringify(rawPost))
}
