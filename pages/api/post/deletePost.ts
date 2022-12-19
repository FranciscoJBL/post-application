import { NextApiResponse, NextApiRequest } from "next"
import prisma from "../../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const postId = req.query.id
    try {
        if (Array.isArray(postId)) {
            await prisma.post.deleteMany({
                where: {
                    id: {
                        in: postId,
                    },
                },
            })
        } else {
            await prisma.post.delete({
                where: {
                    id: postId,
                },
            })
        }
        res.status(200).json({ message: "Post(s) deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Something went wrong" })
    } finally {
        await prisma.$disconnect()
    }
}