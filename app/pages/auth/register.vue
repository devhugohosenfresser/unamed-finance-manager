<template>
     <div
          style="
               max-width: 400px;
               margin: 50px auto;
               padding: 20px;
               border: 1px solid #ccc;
               border-radius: 8px;
          "
     >
          <h1 style="text-align: center; margin-bottom: 20px">Register</h1>

          <form @submit.prevent="registerUser">
               <div style="margin-bottom: 15px">
                    <label>Username</label><br />
                    <input
                         v-model="username"
                         type="text"
                         required
                         style="width: 100%; padding: 8px"
                    />
               </div>

               <div style="margin-bottom: 15px">
                    <label>Email</label><br />
                    <input
                         v-model="email"
                         type="email"
                         required
                         style="width: 100%; padding: 8px"
                    />
               </div>

               <div style="margin-bottom: 15px">
                    <label>Password</label><br />
                    <input
                         v-model="password"
                         type="password"
                         required
                         style="width: 100%; padding: 8px"
                    />
               </div>

               <button
                    type="submit"
                    :disabled="loading"
                    style="
                         width: 100%;
                         padding: 10px;
                         background-color: #28a745;
                         color: white;
                         border: none;
                         border-radius: 4px;
                         cursor: pointer;
                    "
               >
                    {{ loading ? 'Registering...' : 'Register' }}
               </button>

               <p v-if="error" style="color: red; margin-top: 10px">
                    {{ error }}
               </p>
               <p v-if="success" style="color: green; margin-top: 10px">
                    {{ success }}
               </p>
          </form>
     </div>
</template>

<style>
* {
     color: black;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');

const router = useRouter();

async function registerUser() {
     loading.value = true;
     error.value = '';
     success.value = '';

     try {
          const res = await $fetch('/api/auth/register', {
               method: 'POST',
               body: {
                    username: username.value,
                    email: email.value,
                    password: password.value,
               },
               credentials: 'include', // store cookie if you auto-login
          });

          success.value = 'Registration successful!';
          // Optionally redirect to login page after a short delay
          setTimeout(() => router.push('/auth/login'), 1500);
     } catch (err: any) {
          error.value = err?.data?.message || 'Registration failed';
     } finally {
          loading.value = false;
     }
}

definePageMeta({
     layout: 'auth-pages',
});
</script>
