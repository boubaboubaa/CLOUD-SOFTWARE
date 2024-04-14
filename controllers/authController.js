const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/auth');

// signing up
exports.register = async (req, res) => {
    try {
        const { nom, prenom, age, niveauActivite, objectifs, preferences, password } = req.body;
        // checking if user already exists
        let existingUser = await User.findOne({ nom, prenom });
        if (existingUser) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
        }
        // create new user
        const newUser = new User({ nom, prenom, age, niveauActivite, objectifs, preferences, password });
        // Hashing pasword before saving it
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        // generate a token JWT
        const token = jwt.sign({ id: newUser._id }, config.secret, { expiresIn: config.jwtExpiration });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

// user connection
exports.login = async (req, res) => {
    try {
        const { nom, prenom, password } = req.body;
        // lookin for user in database
        const user = await User.findOne({ nom, prenom });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        // generate token JWT
        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: config.jwtExpiration });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

// refresh token JWT
exports.refreshToken = async (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1]; // extract token from header
        const decoded = jwt.verify(token, config.secret); // verify and decode token
        // generate new token with same id
        const newToken = jwt.sign({ id: decoded.id }, config.secret, { expiresIn: config.jwtExpiration });
        // resned new token
        res.status(200).json({ token: newToken });
    } catch (error) {
        res.status(401).json({ message: 'Token invalide', error: error.message });
    }
};
