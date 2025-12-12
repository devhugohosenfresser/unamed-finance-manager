import { db } from '../../database/client';
import { FinancialAccounts } from '../../database/schema';
import { asc } from 'drizzle-orm';

export default defineEventHandler(async () => {
     const AllFinancialAccounts = await db
          .select()
          .from(FinancialAccounts)
          .orderBy(asc(FinancialAccounts.id));
     return AllFinancialAccounts;
});
