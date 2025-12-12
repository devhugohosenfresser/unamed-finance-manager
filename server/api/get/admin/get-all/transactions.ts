import { db } from '../../../../database/client';
import { transactions } from '../../../../database/schema';
import { asc } from 'drizzle-orm';

export default defineEventHandler(async () => {
     const Transactions = await db
          .select()
          .from(transactions)
          .orderBy(asc(transactions.id));
     return Transactions;
});
