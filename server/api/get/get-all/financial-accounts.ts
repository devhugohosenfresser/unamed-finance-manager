import { db } from '../../../database/client';
import { FinancialAccounts } from '../../../database/schema';

export default defineEventHandler(async () => {
     const AllFinancialAccounts = await db.select().from(FinancialAccounts);
     return AllFinancialAccounts;
});
