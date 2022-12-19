import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    return decodedToken
  } catch (error) {
    return null
  }
};

export default decodeToken;