// composables/useAdminFinancialAccounts.ts
import { ref } from 'vue';

interface FinancialAccount {
     id: number;
     userId: number;
     name: string;
     createdAt: string;
}

interface CreateAccountParams {
     name: string;
     UserId: number;
}

export function useAdminFinancialAccounts() {
     // State
     const { data: FinancialAccounts, refresh } = useFetch<FinancialAccount[]>(
          '/api/get/admin/get-all/financial-accounts',
          { server: true }
     );

     const accountName = ref('');
     const userId = ref<number | null>(null);
     const createAccountDialog = ref<HTMLDialogElement | null>(null);
     const isLoading = ref(false);

     // Methods
     const openDialog = () => createAccountDialog.value?.showModal();

     const closeDialog = () => {
          createAccountDialog.value?.close();
          resetForm();
     };

     const resetForm = () => {
          accountName.value = '';
          userId.value = null;
     };

     const createAccount = async () => {
          const name = accountName.value.trim();
          const currentUserId = userId.value;

          if (!name) {
               return alert('Please enter an account name');
          }

          if (!currentUserId) {
               return alert('Please enter a user ID');
          }

          isLoading.value = true;

          try {
               await $fetch('/api/create/financial-account', {
                    method: 'POST',
                    body: {
                         name,
                         UserId: currentUserId,
                    } as CreateAccountParams,
               });

               await refresh?.();
               closeDialog();
               alert('Account created successfully');
          } catch (error: any) {
               console.error('Error creating account:', error);
               alert(error.data?.message || 'Failed to create account');
          } finally {
               isLoading.value = false;
          }
     };

     const updateAccountName = async (id: number, newName: string) => {
          const name = newName.trim();
          if (!name) return alert('Please enter a valid account name');

          try {
               await $fetch('/api/update/name/financial-account', {
                    method: 'PATCH',
                    body: { id, name },
               });
               await refresh?.();
          } catch (error: any) {
               console.error('Error updating account:', error);
               alert(error.data?.message || 'Failed to update account name');
          }
     };

     const deleteAccount = async (id: number) => {
          if (
               !confirm(
                    'Are you sure you want to delete this account? This action cannot be undone.'
               )
          ) {
               return;
          }

          try {
               await $fetch('/api/delete/financial-account', {
                    method: 'DELETE',
                    body: { id },
               });
               await refresh?.();
          } catch (error: any) {
               console.error('Error deleting account:', error);
               alert(error.data?.message || 'Failed to delete account');
          }
     };

     return {
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
     };
}
