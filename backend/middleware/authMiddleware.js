// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET;

// const authMiddleware = (req, res, next) => {
//     // Retrieve token from cookies or headers
//     const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, JWT_SECRET);

//         // Attach the user info (decoded payload) to the request object
//         req.user = decoded;
//         next(); // Continue to the next middleware or route handler
//     } catch (err) {
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// };

// module.exports = authMiddleware;
