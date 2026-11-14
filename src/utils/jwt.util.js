import jwt from "jsonwebtoken";

class JwtUtil {
    generateToken = (user) => {
        const payload = { username: user.username, role: user.role };
        return jwt.sign(
          payload, 
          process.env.SECRET, 
          {
            expiresIn: process.env.EXPIRE_IN
          }
        );
    };
    verifyToken = (token) => {
        return jwt.verify(token, process.env.SECRET);
    };
}

export default JwtUtil;