<script setup lang="ts">
import { computed, watch } from 'vue';
import { useFetch } from '#app';
import { useDate } from '~/composables/useDate';

interface FinancialAccount {
     id: number;
     userId: number;
     name: string;
     createdAt: string;
}

const { data, error } = useFetch<FinancialAccount[]>(
     '/api/financial-accounts/get-all',
     {
          server: true,
          onResponseError: (err: any) => {
               console.error('Error fetching financial accounts:', err);
          },
     }
);

const financialAccounts = data;

const { formatDate } = useDate();

// Watch for errors
watch(error, (newError: any) => {
     if (newError) {
          console.error('Failed to load financial accounts:', newError);
     }
});
</script>

<template>
     <ul v-if="financialAccounts?.length" class="panel-list">
          <li
               v-for="account in financialAccounts"
               :key="account.id"
               class="panel-list-item"
          >
               <div>ID: {{ account.id }}</div>
               <div>Name: {{ account.name }}</div>
               <div>Created: {{ formatDate(account.createdAt) }}</div>
          </li>
     </ul>
     <div v-else class="no-items">No accounts found.</div>
</template>
