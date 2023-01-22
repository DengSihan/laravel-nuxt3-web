<template>

    <nav
        class="my-4">
        <nuxt-link
            to="/">
            <i
                class="mdi mdi-home mr-2"></i>
            index
        </nuxt-link>
    </nav>

    <div
        class="my-4 text-slate-50 bg-slate-900 rounded p-4 overflow-auto">
        <code>
            <pre>{{ auth.user }}</pre>
        </code>
    </div>

    <form
        @submit.prevent="logout">
        <button
            class="btn bg-red-500 hover:bg-red-600 text-white"
            :disabled="loading"
            type="submit">
            logout
            <i
                class="mdi mdi-logout-variant"></i>
        </button>
    </form>

</template>

<script setup>
import { useAuth } from '~/store/auth.js';

definePageMeta({
    middleware: ['auth'],
});

const auth = useAuth();
const router = useRouter();

const logout = async () => {
    await auth.logout();
    router.push('/login');
};
</script>