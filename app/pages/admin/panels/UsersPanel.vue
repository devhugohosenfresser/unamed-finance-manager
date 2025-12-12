<!-- TODO: Add Admin Auth to this page. -->
<script setup lang="ts">
import { useAdminUsers } from '~/composables/useAdminUsers';

const {
     Users,
     updatedUsernames,
     updatedEmails,
     deactivate,
     activate,
     deleteAccount,
     changeUsername,
     changeEmail,
} = useAdminUsers();
</script>

<template>
     <ul v-for="User in Users" :key="User.id" class="user-card">
          <li>
               ID: <strong>{{ User.id }}</strong>
          </li>

          <li>
               Username:
               <input
                    type="text"
                    v-model="updatedUsernames[User.id]"
                    :placeholder="User.username"
                    class="Submit-Button"
               />
               <button @click="changeUsername(User.id)" class="Submit-Button">
                    Update Username
               </button>
          </li>

          <li>
               Email:
               <input
                    type="text"
                    v-model="updatedEmails[User.id]"
                    :placeholder="User.email"
                    class="Submit-Button"
               />
               <button @click="changeEmail(User.id)" class="Submit-Button">
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
               <button @click="deleteAccount(User.id)" class="Submit-Button">
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
<style src="@/assets/CSS/pages/admin/panels/panel.css" scoped></style>
