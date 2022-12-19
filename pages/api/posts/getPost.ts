import { NextApiResponse, NextApiRequest } from "next"
import prisma from "../../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const postId = req.query.id
    if (Array.isArray(postId)) {
        return res.status(404).json({ error: "No array allowed" })
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        })
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }
        res.status(200).json(post)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Something went wrong" })
    } finally {
        await prisma.$disconnect()
    }
}