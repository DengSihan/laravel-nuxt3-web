<template>
    <div
        class="my-4">
        <form
            v-for="provider in availableSocialProviders"
            :key="provider"
            method="POST"
            :action="`${apiBaseURL}/auth/social/${provider}/tokens`">
            <button
                class="btn bg-slate-800 hover:bg-slate-900 text-white"
                type="submit">
                <i
                    class="mdi"
                    :class="`mdi-${provider}`"></i>
                login via {{ provider }}
            </button>
        </form>
    </div>
</template>

<script setup>

const { availableSocialProviders, apiBaseURL } = useRuntimeConfig().public;

</script>