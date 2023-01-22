<template>

    <nav
        class="my-4">
        <template
            v-if="useAuthStore.isAuthed">
            <nuxt-link
                to="/profile">
                <i
                    class="mdi mdi-account"></i>
                profile
            </nuxt-link>
        </template>
        <template
            v-else>
            <nuxt-link
                class="mr-4"
                to="/login">
                <i
                    class="mdi mdi-login-variant"></i>
                login
            </nuxt-link>
            <nuxt-link
                to="/register">
                <i
                    class="mdi mdi-account-plus"></i>
                register
            </nuxt-link>
        </template>
    </nav>

    <div
        class="bg-slate-900 text-slate-50 p-4 rounded overflow-auto my-4">
        <code>
            <pre>{{ data }}</pre>
        </code>
    </div>
</template>

<script setup>
import { useCustomFetch } from '~/composables/useCustomFetch.js';
import { useAuth } from '~/store/auth.js';

const { data } = await useCustomFetch('/client-info');
const useAuthStore = useAuth();

</script>