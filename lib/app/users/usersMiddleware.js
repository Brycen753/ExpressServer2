const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// This finds the root folder (ExpressServer2) regardless of where this script is
const rootPath = process.cwd(); 
const publicKeyPath = path.join(rootPath, 'tas.pub.pem'); 

const publicKey = crypto.createPublicKey({ 
    key: fs.readFileSync(publicKeyPath), 
    format: "pem" 
});

const authenticateUser = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Bearer');

        return res.status(401).json({ "message": "Authentication is required to access this resource" });
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
        res.setHeader('WWW-Authenticate', 'Bearer');

        return res.status(401).json({ "message": "Authentication not recognized" });
    }

    try {
        // 2. Verify using the Public Key and check the issuer
        const payload = jwt.verify(token, publicKey, { issuer: "taz.harding.edu" });
        
        // Store the payload (includes username, roles, etc.)
        res.locals.user = payload;

        next();

    } catch (err) {
        res.setHeader('WWW-Authenticate', 'Bearer');

        return res.status(401).json({ "message": "Authentication not recognized" });
    }
};

const authorizeAdmin = (req, res, next) => {
    // 3. Check the roles array for 'admin'
    const roles = res.locals.user.roles || [];

    if (!roles.includes('admin')) {
        return res.status(403).json({ "message": "Administrator privileges are required to access this resource" });
    }

    next();
};

module.exports = { authenticateUser, authorizeAdmin };