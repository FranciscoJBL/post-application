import { NextApiRequest, NextApiResponse } from "next";
import createPost from "../../../lib/createPost";
import decodeToken from "../../../lib/decodeToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = decodeToken(token);
  if (decodedToken === null) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  const { postName, postDescription } = req.body;

  if (!postName || !postDescription) {
    res.status(400).send({ error: "Post name and description are required" });
    return;
  }

  try {
    const newPost = await createPost({ postName, postDescription, userId: decodedToken.userId });
    res.send({ post: newPost });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};