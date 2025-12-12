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

<style src="@/assets/CSS/components/header.css" scoped></style>
