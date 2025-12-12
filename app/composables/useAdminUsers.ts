// composables/useAdminUsers.ts
import { reactive } from 'vue';

export function useAdminUsers() {
     // Fetch users
     const { data: Users, refresh } = useFetch('/api/get/get-all/users', {
          server: true,
     });

     // Reactive maps for input values
     const updatedUsernames = reactive<Record<number, string>>({});
     const updatedEmails = reactive<Record<number, string>>({});

     // Actions
     async function deactivate(id: number) {
          if (
               !confirm(
                    `Are you sure you want to deactivate Account ID: ${id}?`
               )
          )
               return;
          await $fetch('/api/auth/user-management/deactivate-account', {
               method: 'POST',
               body: { UserId: id },
          });
          await refresh();
     }

     async function activate(id: number) {
          if (!confirm(`Are you sure you want to activate Account ID: ${id}?`))
               return;
          await $fetch('/api/auth/user-management/activate-account', {
               method: 'POST',
               body: { UserId: id },
          });
          await refresh();
     }

     async function deleteAccount(id: number) {
          if (
               !confirm(
                    `Are you sure you want to delete Account ID: ${id}? This cannot be undone.`
               )
          )
               return;
          await $fetch('/api/auth/user-management/delete-account', {
               method: 'POST',
               body: { UserId: id },
          });
          await refresh();
     }

     async function changeUsername(id: number) {
          const newUsername = updatedUsernames[id];
          if (!newUsername) {
               alert('Please enter a username');
               return;
          }
          if (
               !confirm(
                    `Are you sure you want to change the username of Account ID: ${id}?`
               )
          )
               return;
          await $fetch('/api/auth/user-management/change-username', {
               method: 'POST',
               body: { UserId: id, NewUsername: newUsername },
          });
          await refresh();
     }

     async function changeEmail(id: number) {
          const newEmail = updatedEmails[id];
          if (!newEmail) {
               alert('Please enter an email');
               return;
          }
          if (
               !confirm(
                    `Are you sure you want to change the email of Account ID: ${id}?`
               )
          )
               return;
          await $fetch('/api/auth/user-management/change-email', {
               method: 'POST',
               body: { UserId: id, NewEmail: newEmail },
          });
          await refresh();
     }

     return {
          Users,
          refresh,
          updatedUsernames,
          updatedEmails,
          deactivate,
          activate,
          deleteAccount,
          changeUsername,
          changeEmail,
     };
}
