<script setup lang="ts">
const {
     Users,
     updatedUsernames,
     updatedEmails,

     // dialog
     createUserDialog,
     username,
     email,
     password,
     openDialog,
     closeDialog,
     createUser,

     // actions
     deactivate,
     activate,
     deleteAccount,
     changeUsername,
     changeEmail,
} = useAdminUsers();

const { formatDate } = useDate();
</script>

<template>
     <div class="panel-container">
          <button @click="openDialog" class="okay-button">Add User</button>

          <!-- Create User Dialog -->
          <dialog
               ref="createUserDialog"
               class="panel-dialog"
               @click.self="closeDialog"
          >
               <form @submit.prevent="createUser">
                    <h2>Create User</h2>

                    <div class="form-group">
                         <label for="username">Username</label>
                         <input
                              id="username"
                              v-model="username"
                              type="text"
                              class="input-field"
                              required
                         />
                    </div>

                    <div class="form-group">
                         <label for="email">Email</label>
                         <input
                              id="email"
                              v-model="email"
                              type="email"
                              class="input-field"
                              required
                         />
                    </div>

                    <div class="form-group">
                         <label for="password">Password</label>
                         <input
                              id="password"
                              v-model="password"
                              type="password"
                              class="input-field"
                              required
                         />
                    </div>

                    <div class="dialog-actions">
                         <button
                              type="button"
                              class="danger-button"
                              @click="closeDialog"
                         >
                              Cancel
                         </button>
                         <button type="submit" class="okay-button">
                              Create
                         </button>
                    </div>
               </form>
          </dialog>

          <!-- Users List -->
          <ul v-if="Users?.length" class="panel-list">
               <li v-for="user in Users" :key="user.id" class="panel-list-item">
                    ID: {{ user.id }} | Username:
                    <input
                         type="text"
                         v-model="updatedUsernames[user.id]"
                         :placeholder="user.username"
                         class="input-field"
                         @keyup.enter="changeUsername(user.id)"
                    />
                    <button
                         @click="changeUsername(user.id)"
                         class="okay-button"
                    >
                         Update
                    </button>
                    | Email:
                    <input
                         type="email"
                         v-model="updatedEmails[user.id]"
                         :placeholder="user.email"
                         class="input-field"
                         @keyup.enter="changeEmail(user.id)"
                    />
                    <button @click="changeEmail(user.id)" class="okay-button">
                         Update
                    </button>
                    | Role: {{ user.role }} | Status: {{ user.status }}

                    <span
                         v-if="
                              user.status === 'deactivated' ||
                              user.status === 'pending'
                         "
                    >
                         <button @click="activate(user.id)" class="okay-button">
                              Activate
                         </button>
                    </span>

                    <span v-if="user.status === 'active'">
                         <button
                              @click="deactivate(user.id)"
                              class="danger-button"
                         >
                              Deactivate
                         </button>
                    </span>

                    <button
                         @click="deleteAccount(user.id)"
                         class="danger-button"
                    >
                         Delete
                    </button>
                    | Created: {{ formatDate(user.createdAt) }}
               </li>
          </ul>
          <div v-else class="no-items">No users found.</div>
     </div>
</template>
