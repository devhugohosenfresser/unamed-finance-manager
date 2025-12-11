import { db } from '../../../database/client';
import { transactions } from '../../../database/schema';

export default defineEventHandler(async () => {
     const Transactions = await db.select().from(transactions);
     return Transactions;
});
