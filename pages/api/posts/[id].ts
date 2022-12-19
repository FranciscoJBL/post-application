import { NextApiRequest, NextApiResponse } from "next"
import createPost from './createPost'
import getPost from './getPost'
import deletePost from './deletePost'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            await createPost(req, res)
            break;
        case "GET":
            await getPost(req, res)
            break;
        case "DELETE":
            await deletePost(req, res)
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break;
    }
}


