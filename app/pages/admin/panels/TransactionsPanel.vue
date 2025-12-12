<script setup lang="ts">
interface Transaction {
     id: number;
     userId: number;
     FinancialAccountId: number;
     name: string;
     type: string;
     month: string;
     year: number;
     value: string;
     createdAt: string;
}

const { data: Transactions } = await useFetch<Transaction[]>(
     '/api/transactions/get-all',
     {
          server: true,
     }
);
</script>

<template>
     <div class="panel-container">
          <h2>Transactions</h2>
          <ul
               v-for="Transaction in Transactions"
               :key="Transaction.id"
               class="panel-list"
          >
               <li>
                    ID: <strong>{{ Transaction.id }}</strong>
               </li>
               <li>
                    User ID: <strong>{{ Transaction.userId }}</strong>
               </li>
               <li>
                    Account ID:
                    <strong>{{ Transaction.FinancialAccountId }}</strong>
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
     </div>
</template>

<style scoped>
.panel-list {
     margin-top: 1rem;
     margin-bottom: 1.5rem;
     padding: 1rem;
     background: white;
     border-radius: 8px;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.panel-list li {
     padding: 0.5rem 0;
     border-bottom: 1px solid #e5e7eb;
}

.panel-list li:last-child {
     border-bottom: none;
}

strong {
     color: #1f2937;
}
</style>
