const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = db.users;
const SECRET = process.env.TOKEN_SECRET;  // No default should be provided here. Ensure the environment variable is set.

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ status: 'error', message: "Email already registered." });

        const hashedPassword = await hashPassword(password);
        await User.create({ name, email, encryptedPassword: hashedPassword });
        
        res.status(201).json({ status: 'success', message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ status: 'error', message: "Error registering user." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ status: 'error', message: "Invalid credentials." });

        const isValidPassword = await comparePassword(password, user.encryptedPassword);
        if (!isValidPassword) return res.status(400).json({ status: 'error', message: "Invalid credentials." });

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
        
        res.json({ status: 'success', token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: "Error during login." });
    }
};
