<script setup lang="ts">
const { data: userCount } = await useFetch('/api/get/get-count/users', {
     server: true,
});
const { data: transactionsCount } = await useFetch(
     '/api/get/get-count/transactions',
     { server: true }
);
const { data: LogsCount } = await useFetch('/api/get/get-count/logs', {
     server: true,
});
const { data: FinancialAccountsCount } = await useFetch(
     '/api/get/get-count/financial-accounts',
     { server: true }
);
</script>

<template>
     <div class="WidgetGrid">
          <ul class="Widget">
               <li class="WidgetTitle">
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
                    Total
                    <NuxtLink to="/admin/panels/LogsPanel">Logs</NuxtLink>:
                    {{ LogsCount }}
               </li>
               <li class="WidgetFooter">
                    <NuxtLink to="/admin/panels">Panel Overview</NuxtLink>
               </li>
          </ul>
     </div>
</template>
