import express, { Request } from 'express'
import mongoose from 'mongoose'
import authmiddleware from '../middleware/auth'
// Extend the Express Request interface to include userId
interface AuthenticatedRequest extends Request {
    userId?: string;
    amount?: number;
    to?: string;
}
import { Account } from '../db'
const router = express.Router()
router.get('/balance', authmiddleware,async (req: AuthenticatedRequest, res) => {
    try {
        // Check if userId exists on the request 
        if (!req.userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const account = await Account.findOne({ userId: req.userId })
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json({ balance: account.balance })
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Server error', error });
    }

})
router.post('/transfer',authmiddleware, async (req: AuthenticatedRequest, res) => {
    const session = await mongoose.startSession();
    try {

        session.startTransaction()

        const { amount, to } = req.body
        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);


        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        });
    }
    catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: 'Server error', error });
    } finally {
        session.endSession(); 
    }
})
export default router