import { db } from '../../database/client';
import { FinancialAccounts } from '../../database/schema';

interface CreateAccountBody {
    UserId: number;
    name: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateAccountBody>(event);
    const { UserId, name } = body;

    // Validate input
    if (!UserId || !name?.trim()) {
        throw createError({
            statusCode: 400,
            statusMessage: 'UserId and account name are required.',
        });
    }

    // Insert account and return created row
    const [account] = await db
        .insert(FinancialAccounts)
        .values({
            userId: UserId,
            name: name.trim(),
        })
        .returning();

    if (!account) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create account.',
        });
    }

    return { account };
});
