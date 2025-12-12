<!-- TODO: Add Admin Auth to this page. -->
<script setup lang="ts">
import { ref, reactive } from 'vue';

const { data: Users, refresh } = await useFetch('/api/get/get-all/users', {
     server: true,
});

// reactive object to store updated usernames per user ID
const updatedUsernames = reactive<Record<number, string>>({});
// reactive object to store updated emails per user ID
const updatedEmails = reactive<Record<number, string>>({});

async function deactivate(id: number) {
     if (!confirm(`Are you sure you want to deactivate Account ID: ${id}?`))
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

async function delete_account(id: number) {
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

async function change_username(id: number) {
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

async function change_email(id: number) {
     const newEmail = updatedEmails[id];
     if (!newEmail) {
          alert('Please enter a username');
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
</script>

<template>
     <ul v-for="User in Users" :key="User.id" class="user-card">
          <!-- used for api's -->
          <input type="hidden" name="UserId" :value="User.id" />

          <li>
               ID: <strong>{{ User.id }}</strong>
          </li>
          <li>
               Username: <strong>{{ User.username }}</strong>
          </li>
          <li>
               Username: <strong>{{ User.username }}</strong>
          </li>
          <li>
               <input
                    type="text"
                    v-model="updatedUsernames[User.id]"
                    :placeholder="User.username"
                    class="Submit-Button"
               />
               <button @click="change_username(User.id)" class="Submit-Button">
                    Update Username
               </button>
          </li>
          <li>
               Email: <strong>{{ User.email }}</strong>
          </li>
          <li>
               <input
                    type="text"
                    v-model="updatedEmails[User.id]"
                    :placeholder="User.email"
                    class="Submit-Button"
               />
               <button @click="change_email(User.id)" class="Submit-Button">
                    Update Email
               </button>
          </li>
          <li>
               Role: <strong>{{ User.role }}</strong>
          </li>
          <li>
               Status: <strong>{{ User.status }}</strong>
          </li>
          <li v-if="User.status === 'deactivated' || User.status === 'pending'">
               <button @click="activate(User.id)" class="Submit-Button">
                    Activate Account
               </button>
          </li>

          <li v-if="User.status === 'active'">
               <button @click="deactivate(User.id)" class="Submit-Button">
                    Deactivate Account
               </button>
          </li>
          <li>
               <button @click="delete_account(User.id)" class="Submit-Button">
                    Delete Account
               </button>
          </li>
          <li>
               Created At: <strong>{{ User.createdAt }}</strong>
          </li>
     </ul>
</template>

<style scoped>
.Submit-Button {
     color: black !important;
}
</style>
<style src="@/assets/CSS/admin/panels/panel.css" scoped></style>
