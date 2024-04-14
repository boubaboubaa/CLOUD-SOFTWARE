const jwt = require('jsonwebtoken');
const config = require('../config/auth');

exports.authenticate = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }

    // when token is preceded by 'Bearer '
    const parts = token.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
    } else {
        return res.status(401).json({ message: 'Format du token non valide' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide', error: error.message });
    }
};
