import  {Account} from '../db';

const transferFunds = async (fromAccountId:string, toAccountId :string, amount:number) => {
    // Decrement the balance of the fromAccount
	  await Account.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } });

    // Increment the balance of the toAccount
    await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
}