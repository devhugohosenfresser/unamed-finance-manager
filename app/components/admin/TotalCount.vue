<script setup lang="ts">
const { data: userCount } = await useFetch('/api/get-count/users', {
     server: true,
});
const { data: transactionsCount } = await useFetch(
     '/api/get-count/transactions',
     { server: true }
);
const { data: subscriptionsCount } = await useFetch(
     '/api/get-count/subscriptions',
     { server: true }
);
const { data: LogsCount } = await useFetch('/api/get-count/logs', {
     server: true,
});
</script>

<template>
     <ul class="Widget">
          <li class="WidgetTitle">
               <strong>Overview</strong>
          </li>
          <li>
               Total Users: <strong>{{ userCount }}</strong>
          </li>
          <li>
               Total Transactions: <strong>{{ transactionsCount }}</strong>
          </li>
          <li>
               Total Subcriptions: <strong>{{ subscriptionsCount }}</strong>
          </li>
          <li>
               Total Logs: <strong>{{ LogsCount }}</strong>
          </li>
     </ul>
</template>
