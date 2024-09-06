import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './db';
import dotenv from 'dotenv'
dotenv.config()
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6).max(32),
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6).max(32),
});

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { success, data, error } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: 'Invalid data provided', error: error?.issues });
    }

    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(data.password, 10); 

    const user = await User.create({
        username: data.username,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
    res.json({
        message: "User created successfully",
        token: token,
    });
});

// Signin Route
router.post('/signin', async (req, res) => {
    const { success, data, error } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: 'Incorrect email or password', error: error?.issues });
    }

    const user = await User.findOne({ username: data.username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET as string);
    res.json({ token });
});

export default router;
