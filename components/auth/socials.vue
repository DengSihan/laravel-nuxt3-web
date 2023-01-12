<template>
    <div>
        <form
            v-for="provider in availableSocialProviders"
            :key="provider"
            method="POST"
            :action="`${apiBaseURL}/auth/social/${provider}/tokens`">
            <button
                type="submit">
                {{ provider }}
            </button>
        </form>
    </div>
</template>

<script setup>

const { availableSocialProviders, apiBaseURL } = useRuntimeConfig().public;

</script>