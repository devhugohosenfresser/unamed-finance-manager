import {
     pgTable,
     serial,
     varchar,
     integer,
     decimal,
     timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// USERS
export const users = pgTable('Users', {
     id: serial('id').primaryKey(),
     email: varchar('email', { length: 64 }).notNull().unique(),
     username: varchar('username', { length: 64 }).notNull().unique(),
     password: varchar('password', { length: 64 }).notNull(),
     role: varchar('role', { length: 16 }).notNull(),
     status: varchar('status', { length: 32 }).notNull().default('pending'),
     createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ACCOUNTS
export const FinancialAccounts = pgTable('FinancialAccounts', {
     id: serial('id').primaryKey(),
     userId: integer('user_id')
          .notNull()
          .references(() => users.id),
     name: varchar('name', { length: 64 }).notNull(),
     createdAt: timestamp('created_at').defaultNow().notNull(),
});

// TRANSACTIONS
export const transactions = pgTable('Transactions', {
     id: serial('id').primaryKey(),
     userId: integer('user_id')
          .notNull()
          .references(() => users.id),
     financialAccountId: integer('account_id')
          .notNull()
          .references(() => FinancialAccounts.id),
     name: varchar('name', { length: 64 }).notNull(),
     type: varchar('type', { length: 16 }).notNull(),
     month: varchar('month', { length: 64 }).notNull(),
     year: integer('year').notNull(),
     value: decimal('value').notNull(),
     createdAt: timestamp('created_at').defaultNow().notNull(),
});

// LOGS
export const logs = pgTable('Logs', {
     id: serial('id').primaryKey(),
     userId: integer('user_id')
          .notNull()
          .references(() => users.id),
     transactionId: integer('transaction_id').references(() => transactions.id),
     FinancialAccountId: integer('FinancialAccount_id').references(
          () => FinancialAccounts.id
     ),
     type: varchar('type', { length: 32 }).notNull(),
     note: varchar('note', { length: 255 }),
     value: decimal('value'),
     createdAt: timestamp('created_at').defaultNow().notNull(),
});

/* --------------------------------- RELATIONS --------------------------------- */

// User relations
export const usersRelations = relations(users, ({ many }) => ({
     accounts: many(FinancialAccounts),
     transactions: many(transactions),
     logs: many(logs),
}));

// FinancialAccounts relations
export const accountsRelations = relations(
     FinancialAccounts,
     ({ one, many }) => ({
          user: one(users, {
               fields: [FinancialAccounts.userId],
               references: [users.id],
          }),
          transactions: many(transactions),
          logs: many(logs),
     })
);

// Transactions relations
export const transactionsRelations = relations(transactions, ({ one }) => ({
     user: one(users, {
          fields: [transactions.userId],
          references: [users.id],
     }),
     account: one(FinancialAccounts, {
          fields: [transactions.financialAccountId],
          references: [FinancialAccounts.id],
     }),
}));

// Logs relations
export const logsRelations = relations(logs, ({ one }) => ({
     user: one(users, {
          fields: [logs.userId],
          references: [users.id],
     }),
     transaction: one(transactions, {
          fields: [logs.transactionId],
          references: [transactions.id],
     }),
     account: one(FinancialAccounts, {
          fields: [logs.FinancialAccountId],
          references: [FinancialAccounts.id],
     }),
}));
