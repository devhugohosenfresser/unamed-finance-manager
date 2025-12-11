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
               <Sidepanel />
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

<style scoped>
.app-layout {
     display: flex;
     min-height: 100vh;
}

.PageWrapper {
     padding: 20px;
}

.sidepanel {
     padding: 15px;
     width: 300px;
     flex-shrink: 0;
     background-color: var(--sidebar-bg);
     border-right: var(--sidebar-border);
     height: 100vh;
     position: sticky;
     top: 0;
}

.sidebar-closed {
     display: none;
}

.main-content {
     flex: 1;
     display: flex;
     flex-direction: column;
}
</style>
