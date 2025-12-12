<script setup lang="ts">
import { useAdminFinancialAccounts } from '~/composables/useAdminFinancialAccounts';

const {
     // State
     FinancialAccounts,
     accountName,
     userId,
     createAccountDialog,
     isLoading,

     // Methods
     openDialog,
     closeDialog,
     createAccount,
     updateAccountName,
     deleteAccount,
} = useAdminFinancialAccounts();

const { formatDate } = useDate();

const handleSubmit = (e: Event) => {
     e.preventDefault();
     createAccount();
};
</script>

<template>
     <div class="panel-container">
          <button @click="openDialog" class="okay-button">Add Account</button>

          <!-- Create Account Dialog -->
          <dialog
               ref="createAccountDialog"
               class="panel-dialog"
               @click.self="closeDialog"
          >
               <form @submit="handleSubmit">
                    <h2>Create Account</h2>

                    <div class="form-group">
                         <label for="userId">User ID</label>
                         <input
                              id="userId"
                              v-model.number="userId"
                              type="number"
                              class="input-field"
                              required
                              min="1"
                              :disabled="isLoading"
                         />
                    </div>

                    <div class="form-group">
                         <label for="accountName">Account Name</label>
                         <input
                              id="accountName"
                              v-model="accountName"
                              type="text"
                              class="input-field"
                              required
                              :disabled="isLoading"
                              @keydown.enter.prevent
                         />
                    </div>

                    <div class="dialog-actions">
                         <button
                              type="button"
                              class="danger-button"
                              @click="closeDialog"
                              :disabled="isLoading"
                         >
                              Cancel
                         </button>
                         <button
                              type="submit"
                              class="okay-button"
                              :disabled="isLoading"
                         >
                              Create
                         </button>
                    </div>
               </form>
          </dialog>

          <!-- Simple Accounts List -->
          <ul
               v-if="FinancialAccounts && FinancialAccounts.length > 0"
               class="panel-list"
          >
               <li
                    v-for="account in FinancialAccounts"
                    :key="account?.id || ''"
                    class="panel-list-item"
               >
                    ID: {{ account.id }} | User ID: {{ account.userId }} | Name:
                    <input
                         type="text"
                         v-model="account.name"
                         @keyup.enter="
                              updateAccountName(account.id, account.name)
                         "
                         class="input-field"
                    />
                    | Created: {{ formatDate(account.createdAt) }}
                    <button
                         @click="deleteAccount(account.id, account.userId)"
                         class="danger-button"
                    >
                         Delete
                    </button>
               </li>
          </ul>
          <div
               v-else-if="FinancialAccounts && FinancialAccounts.length === 0"
               class="no-items"
          >
               No accounts found.
          </div>
          <div v-else class="no-items">Loading accounts...</div>
     </div>
</template>
