<script setup lang="ts">
const { data: Logs } = await useFetch('/api/get/get-all/logs', {
     server: true,
});
</script>

<template>
     <ul v-for="Log in Logs" :key="Log.id" class="user-card">
          <li>
               ID: <strong>{{ Log.id }}</strong>
          </li>
          <li>
               User ID: <strong>{{ Log.userId }}</strong>
          </li>
          <li>
               Account ID: <strong>{{ Log.FinancialAccountId }}</strong>
          </li>
          <li>
               Transaction ID: <strong>{{ Log.transactionId }}</strong>
          </li>
          <li>
               Role: <strong>{{ Log.type }}</strong>
          </li>
          <li>
               Note: <strong>{{ Log.note }}</strong>
          </li>
          <li>
               Role: <strong>{{ Log.value }}</strong>
          </li>
          <li>
               Created At: <strong>{{ Log.createdAt }}</strong>
          </li>
     </ul>
</template>

<style src="@/assets/CSS/admin/panels/panel.css" scoped></style>
