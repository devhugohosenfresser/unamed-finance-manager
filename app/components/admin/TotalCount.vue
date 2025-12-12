<script setup lang="ts">
const { data: userCount } = await useFetch('/api/user-accounts/get-count', {
     server: true,
});
const { data: transactionsCount } = await useFetch(
     '/api/transactions/get-count',
     { server: true }
);
const { data: FinancialAccountsCount } = await useFetch(
     '/api/financial-accounts/get-count',
     { server: true }
);
</script>

<template>
     <div>
          <ul>
               <li>
                    <strong>Overview</strong>
               </li>
               <li>
                    Total
                    <NuxtLink to="/admin/panels/UserPanel">Users</NuxtLink>:
                    {{ userCount }}
               </li>
               <li>
                    Total
                    <NuxtLink to="/admin/panels/LogsPanel"
                         >Financial Accounts</NuxtLink
                    >:
                    {{ FinancialAccountsCount }}
               </li>
               <li>
                    Total
                    <NuxtLink to="/admin/panels/TransactionPanel">
                         Transactions</NuxtLink
                    >:
                    {{ transactionsCount }}
               </li>
               <li>
                    <NuxtLink to="/admin/panels">Panel Overview</NuxtLink>
               </li>
          </ul>
     </div>
</template>
