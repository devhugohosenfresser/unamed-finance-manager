<!-- TODO: Add Admin Auth to this page. -->
<script setup lang="ts">
const { data: Transactions } = await useFetch('/api/get/get-all/transactions', {
     server: true,
});
</script>

<template>
     <ul
          v-for="Transaction in Transactions"
          :key="Transaction.id"
          class="user-card"
     >
          <li>
               ID: <strong>{{ Transaction.id }}</strong>
          </li>
          <li>
               User ID: <strong>{{ Transaction.userId }}</strong>
          </li>
          <li>
               Account ID: <strong>{{ Transaction.FinancialAccountId }}</strong>
          </li>
          <li>
               Name: <strong>{{ Transaction.name }}</strong>
          </li>
          <li>
               Type: <strong>{{ Transaction.type }}</strong>
          </li>
          <li>
               Month: <strong>{{ Transaction.month }}</strong>
          </li>
          <li>
               Year: <strong>{{ Transaction.year }}</strong>
          </li>
          <li>
               Value: <strong>{{ Transaction.value }}</strong>
          </li>
          <li>
               Created At: <strong>{{ Transaction.createdAt }}</strong>
          </li>
     </ul>
</template>

<style src="@/assets/CSS/admin/panels/panel.css" scoped></style>
