import { db } from '../../../database/client';
import { transactions } from '../../../database/schema';

export default defineEventHandler(async () => {
     const TransactionsCount = await db.$count(transactions);
     return TransactionsCount;
});
