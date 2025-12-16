<template>
     <div class="login-container">
          <div class="login-card">
               <h1 class="login-title">Welcome Back</h1>
               <p class="login-subtitle">
                    Please enter your credentials to continue
               </p>

               <form @submit.prevent="loginUser" class="login-form">
                    <div class="form-group">
                         <label for="email" class="form-label"
                              >Email Address</label
                         >
                         <input
                              id="email"
                              v-model="email"
                              type="email"
                              class="form-input"
                              placeholder="Enter your email"
                              required
                         />
                    </div>

                    <div class="form-group">
                         <label for="password" class="form-label"
                              >Password</label
                         >
                         <input
                              id="password"
                              v-model="password"
                              type="password"
                              class="form-input"
                              placeholder="Enter your password"
                              required
                         />
                    </div>

                    <button
                         type="submit"
                         class="login-button"
                         :disabled="loading"
                    >
                         <span>Sign In</span>
                    </button>

                    <p v-if="error" class="error-message">
                         {{ error }}
                    </p>
                    <p v-if="success" class="success-message">
                         {{ success }}
                    </p>
               </form>

               <p class="signup-link">
                    Don't have an account?
                    <a href="/auth/register" class="signup-button">Sign up</a>
               </p>
          </div>
     </div>
</template>

<style src="@/assets/CSS/pages/login.css" scoped></style>

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
