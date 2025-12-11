<script setup lang="ts">
const { data: FinancialAccounts } = await useFetch(
    '/api/get/get-all/financial-accounts',
    {
        server: true,
    }
);
</script>

<template>
    <ul
        v-for="FinancialAccount in FinancialAccounts"
        :key="FinancialAccount.id"
        class="user-card"
    >
        <li>
            ID: <strong>{{ FinancialAccount.id }}</strong>
        </li>
        <li>
            User ID: <strong>{{ FinancialAccount.userId }}</strong>
        </li>
        <li>
            Name: <strong>{{ FinancialAccount.name }}</strong>
        </li>
        <li>
            Created At: <strong>{{ FinancialAccount.createdAt }}</strong>
        </li>
    </ul>
</template>

<style src="@/assets/CSS/admin/panels/panel.css" scoped></style>
