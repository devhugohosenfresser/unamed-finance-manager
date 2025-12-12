<script setup lang="ts">
import { ref } from 'vue';

// Sidebar state
const sidebarOpen = ref(true);

// Toggle function, passed to Header
const toggleSidebar = () => {
     sidebarOpen.value = !sidebarOpen.value;
};
</script>

<template>
     <div class="app-layout">
          <!-- Sidebar -->
          <aside :class="['sidepanel', { 'sidebar-closed': !sidebarOpen }]">
               <Side-panel />
          </aside>

          <!-- Main content -->
          <div class="main-content">
               <Header
                    :toggleSidebar="toggleSidebar"
                    :sidebarOpen="sidebarOpen"
               />

               <div class="PageWrapper">
                    <slot />
               </div>

               <Footer />
          </div>
     </div>
</template>

<style scoped src="@/assets/CSS/layouts/default.css"></style>
