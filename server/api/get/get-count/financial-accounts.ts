// TODO: Add Admin Auth to this api.
import { db } from '../../../database/client';
import { FinancialAccounts } from '../../../database/schema';

export default defineEventHandler(async () => {
     const FinancialAccountsCount = await db.$count(FinancialAccounts);
     return FinancialAccountsCount;
});
