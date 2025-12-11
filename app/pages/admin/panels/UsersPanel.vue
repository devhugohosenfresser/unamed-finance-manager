<script setup lang="ts">
const { data: Users } = await useFetch('/api/get/get-all/users', {
    server: true,
});
</script>

<template>
    <ul v-for="User in Users" :key="User.id" class="user-card">
        <li>
            ID: <strong>{{ User.id }}</strong>
        </li>
        <li>
            Username: <strong>{{ User.username }}</strong>
        </li>
        <li>
            Email: <strong>{{ User.email }}</strong>
        </li>
        <li>
            Role: <strong>{{ User.role }}</strong>
        </li>
        <li>
            Created At: <strong>{{ User.createdAt }}</strong>
        </li>
    </ul>
</template>

<style src="@/assets/CSS/admin/panels/panel.css" scoped></style>
