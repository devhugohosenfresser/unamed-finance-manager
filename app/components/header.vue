<script setup lang="ts">
defineProps<{
     toggleSidebar: () => void;
     sidebarOpen: boolean;
}>();
</script>

<template>
     <div class="header">
          <button class="sidebar-toggle" @click="toggleSidebar">
               <span v-if="sidebarOpen">&#10005;</span>
               <span v-else>&#9776;</span>
          </button>
     </div>
</template>

<style scoped>
.header {
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0.5rem;
     background-color: var(--widget-bg);
     color: var(--font-color);
}

.sidebar-toggle {
     background-color: var(--sidebar-bg);
     color: var(--link-color);
     border: none;
     font-size: 1.3rem;
     cursor: pointer;
     padding: 0.5rem 1rem;
     border-radius: 5px;
}
</style>
