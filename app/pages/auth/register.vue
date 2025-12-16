<template>
     <div class="register-container">
          <div class="register-card">
               <h1 class="register-title">Create an Account</h1>
               <p class="register-subtitle">Join us to get started</p>

               <form @submit.prevent="registerUser" class="register-form">
                    <div class="form-group">
                         <label for="username" class="form-label"
                              >Username</label
                         >
                         <input
                              id="username"
                              v-model="username"
                              type="text"
                              class="form-input"
                              placeholder="Choose a username"
                              required
                         />
                    </div>

                    <div class="form-group">
                         <label for="email" class="form-label">Email</label>
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
                              placeholder="Create a password"
                              required
                         />
                    </div>

                    <button
                         type="submit"
                         class="register-button"
                         :disabled="loading"
                    >
                         <span>{{
                              loading ? 'Creating Account...' : 'Sign Up'
                         }}</span>
                    </button>

                    <p v-if="error" class="error-message">
                         {{ error }}
                    </p>
                    <p v-if="success" class="success-message">
                         {{ success }}
                    </p>
               </form>

               <p class="login-link">
                    Already have an account?
                    <a href="/auth/login" class="login-button">Sign in</a>
               </p>
          </div>
     </div>
</template>

<style src="@/assets/CSS/pages/register.css" scoped></style>

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
