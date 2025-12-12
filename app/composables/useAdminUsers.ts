// composables/useAdminUsers.ts
import { reactive, ref } from 'vue';

export function useAdminUsers() {
     // Fetch users
     const { data: Users, refresh } = useFetch('/api/get/admin/get-all/users', {
          server: true,
     });

     // Form fields for creating a new user
     const username = ref('');
     const email = ref('');
     const password = ref('');

     // Dialog reference
     const createUserDialog = ref<HTMLDialogElement | null>(null);

     function openDialog() {
          createUserDialog.value?.showModal();
     }

     function closeDialog() {
          createUserDialog.value?.close();
     }

     // Create a new user
     async function createUser() {
          if (!username.value || !email.value || !password.value) {
               alert('Please fill out all fields');
               return;
          }

          try {
               await $fetch('/api/auth/register', {
                    method: 'POST',
                    body: {
                         username: username.value,
                         email: email.value,
                         password: password.value,
                    },
               });

               alert('User created successfully');

               // Clear form
               username.value = '';
               email.value = '';
               password.value = '';

               closeDialog();

               // Refresh user list
               await refresh();
          } catch (err: any) {
               alert(err?.data?.statusMessage || 'Failed to create user');
          }
     }

     // Existing reactive maps
     const updatedUsernames = reactive<Record<number, string>>({});
     const updatedEmails = reactive<Record<number, string>>({});

     // Actions
     async function deactivate(id: number) {
          if (!confirm(`Deactivate Account ID: ${id}?`)) return;
          await $fetch('/api/auth/user-management/deactivate-account', {
               method: 'POST',
               body: { UserId: id },
          });
          await refresh();
     }

     async function activate(id: number) {
          if (!confirm(`Activate Account ID: ${id}?`)) return;
          await $fetch('/api/auth/user-management/activate-account', {
               method: 'POST',
               body: { UserId: id },
          });
          await refresh();
     }

     async function deleteAccount(id: number) {
          if (!confirm(`Delete Account ID: ${id}? This cannot be undone.`))
               return;
          await $fetch('/api/auth/user-management/delete-account', {
               method: 'DELETE',
               body: { UserId: id },
          });
          await refresh();
     }

     async function changeUsername(id: number) {
          const newUsername = updatedUsernames[id];
          if (!newUsername) return alert('Please enter a username');

          if (!confirm(`Change username for Account ID: ${id}?`)) return;

          await $fetch('/api/auth/user-management/change-username', {
               method: 'POST',
               body: { UserId: id, NewUsername: newUsername },
          });
          await refresh();
     }

     async function changeEmail(id: number) {
          const newEmail = updatedEmails[id];
          if (!newEmail) return alert('Please enter an email');

          if (!confirm(`Change email for Account ID: ${id}?`)) return;

          await $fetch('/api/auth/user-management/change-email', {
               method: 'POST',
               body: { UserId: id, NewEmail: newEmail },
          });
          await refresh();
     }

     return {
          Users,
          refresh,

          // create user dialog + fields
          createUserDialog,
          username,
          email,
          password,
          openDialog,
          closeDialog,
          createUser,

          // API Update Thingis
          updatedUsernames,
          updatedEmails,
          deactivate,
          activate,
          deleteAccount,
          changeUsername,
          changeEmail,
     };
}
