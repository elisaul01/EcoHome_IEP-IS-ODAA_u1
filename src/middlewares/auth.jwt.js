import JwtUtil from "../utils/jwt.util.js";

const jwtUtil = new JwtUtil();
const authJwt = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return res.status(401).json({
                success: false,
                message: "Token inválido"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwtUtil.verifyToken(token);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
          success: false,
          message: "Token inválido o expirado",
        });
    }
}

export default authJwt;