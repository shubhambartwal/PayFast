import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../db';
import dotenv from 'dotenv'
import auth from '../middleware/auth';
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

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})


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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
    res.json({ token });
});
router.put('/', auth, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(400).json({ message: 'Invalid data provided', error: req.body.error })
    }
    await User.updateOne({ _id: req.body.id }, req.body)
    res.json({ message: 'Updated Successfully' })
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
export default router;
