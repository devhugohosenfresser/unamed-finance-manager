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
          <h1 style="text-align: center; margin-bottom: 20px">Login</h1>

          <form @submit.prevent="loginUser">
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
                         background-color: #007bff;
                         color: white;
                         border: none;
                         border-radius: 4px;
                         cursor: pointer;
                    "
               >
                    {{ loading ? 'Logging in...' : 'Login' }}
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

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');

const router = useRouter();

async function loginUser() {
     loading.value = true;
     error.value = '';
     success.value = '';

     try {
          const res = await $fetch('/api/auth/login', {
               method: 'POST',
               body: {
                    email: email.value,
                    password: password.value,
               },
               credentials: 'include', // important to store session cookie
          });

          success.value = 'Login successful!';
          setTimeout(() => router.push('/user/dashboard'), 1000);
     } catch (err: any) {
          error.value = err?.data?.message || 'Login failed';
     } finally {
          loading.value = false;
     }
}

definePageMeta({
     layout: 'auth-pages',
});
</script>
