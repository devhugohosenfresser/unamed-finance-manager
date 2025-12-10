import {
     pgTable,
     serial,
     varchar,
     integer,
     decimal,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// USERS
export const users = pgTable('Users', {
     id: serial('id').primaryKey(),
     email: varchar('email', { length: 64 }).notNull(),
     username: varchar('username', { length: 64 }).notNull(),
     password: varchar('password', { length: 64 }).notNull(),
     role: varchar('type', { length: 16 }).notNull(),
});

// ACCOUNTS
export const accounts = pgTable('Accounts', {
     id: serial('id').primaryKey(),
     userId: integer('user_id')
          .notNull()
          .references(() => users.id),
     name: varchar('name', { length: 64 }).notNull(),
     value: decimal('value').notNull(),
     spendingGoal: decimal('spending_goal'),
});

// TRANSACTIONS
export const transactions = pgTable('Transactions', {
     id: serial('id').primaryKey(),
     userId: integer('user_id')
          .notNull()
          .references(() => users.id),
     accountId: integer('account_id')
          .notNull()
          .references(() => accounts.id),
     type: varchar('type', { length: 16 }).notNull(),
     value: decimal('value').notNull(),
});

// SUBSCRIPTIONS
export const subscriptions = pgTable('Subscriptions', {
     id: serial('id').primaryKey(),
     userId: integer('user_id')
          .notNull()
          .references(() => users.id),
     accountId: integer('account_id')
          .notNull()
          .references(() => accounts.id),
     frequency: varchar('frequency', { length: 16 }).notNull(),
     value: decimal('value').notNull(),
});

// LOGS
export const logs = pgTable('Logs', {
     id: serial('id').primaryKey(),
     userId: integer('user_id')
          .notNull()
          .references(() => users.id),
     type: varchar('type', { length: 32 }).notNull(),
     note: varchar('note', { length: 255 }),
     value: decimal('value'),
});

/* --------------------------------- RELATIONS --------------------------------- */

// User relations
export const usersRelations = relations(users, ({ many }) => ({
     accounts: many(accounts),
     transactions: many(transactions),
     subscriptions: many(subscriptions),
     logs: many(logs),
}));

// Account relations
export const accountsRelations = relations(accounts, ({ one, many }) => ({
     user: one(users, {
          fields: [accounts.userId],
          references: [users.id],
     }),
     transactions: many(transactions),
     subscriptions: many(subscriptions),
}));

// Transaction relations
export const transactionsRelations = relations(transactions, ({ one }) => ({
     user: one(users, {
          fields: [transactions.userId],
          references: [users.id],
     }),
     account: one(accounts, {
          fields: [transactions.accountId],
          references: [accounts.id],
     }),
}));

// Subscription relations
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
     user: one(users, {
          fields: [subscriptions.userId],
          references: [users.id],
     }),
     account: one(accounts, {
          fields: [subscriptions.accountId],
          references: [accounts.id],
     }),
}));

// Logs relations
export const logsRelations = relations(logs, ({ one }) => ({
     user: one(users, {
          fields: [logs.userId],
          references: [users.id],
     }),
}));
