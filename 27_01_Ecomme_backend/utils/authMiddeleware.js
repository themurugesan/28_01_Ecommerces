const jwt = require("jsonwebtoken");
const  secretKey  = require("../configuration/jwtConfig");  // Import the secret key

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    console.log(authHeader);
    
    
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

   
    jwt.verify(authHeader,"secretKey", (err, user) => {
        if (err) {
            console.log("JWT Verification Error:", err.message);  // Log error message
            return res.status(401).json({ message: "Forbidden: Invalid token",code:401 });
        }


        req.user = user;
        console.log(user)
        
        next();
    });
    
}

module.exports = { authenticateToken };
