<template>
    <AdminPanelIndex />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    auth: {
        required: true,
        adminOnly: true,
    },
});
</script>
