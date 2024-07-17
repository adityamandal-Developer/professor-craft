const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/httpError.helpers");
const { User } = require("../models/user.modal");

const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const id = req.params.id;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        // const user = await User.findById(id);
        const decoded = jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] });
        const varified = decoded.userId === id
        if (!varified) {
            return res.status(401).json({ message: "Access denied" });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { authenticate };
