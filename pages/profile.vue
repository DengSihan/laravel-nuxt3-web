<template>
    <main>
        profile
    </main>
    <div>
        <code>
            <pre>{{ auth.user }}</pre>
        </code>
    </div>
    <nav>
        <ul>
            <li>
                <nuxt-link
                    to="/">
                    index
                </nuxt-link>
            </li>
        </ul>
    </nav>
    <form
        @submit.prevent="logout">
        <button
            :disabled="loading"
            type="submit">
            logout
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