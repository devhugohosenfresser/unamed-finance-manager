<script setup lang="ts">
const { data: Logs } = await useFetch('/api/get/admin/get-all/logs', {
     server: true,
});
</script>

<template>
     <div class="panel-container">
          <h2>System Logs</h2>
          <ul v-for="Log in Logs" :key="Log.id" class="panel-list">
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
     </div>
</template>

<style scoped>
.panel-list {
     margin-top: 1rem;
}

.panel-list li {
     padding: 0.5rem;
     margin: 0.25rem 0;
     border-bottom: 1px solid #e5e7eb;
}

.panel-list li:last-child {
     border-bottom: none;
}
</style>
