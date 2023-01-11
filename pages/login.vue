<template>
    <main>
        <form
            @submit.prevent="login">
            
            <label
                for="email">
                email
            </label>
            <input
                id="email"
                type="email"
                v-model="form.email"
                required>

            <label
                for="password">
                password
            </label>
            <input
                id="password"
                type="password"
                v-model="form.password"
                required>

            <button
                type="submit"
                :disabled="loading">
                login
            </button>
            
        </form>
    </main>
</template>

<script setup>
import { useCustomFetch } from '~/composables/useCustomFetch.js';
import { useAuth } from '~/store/auth.js';

definePageMeta({
    middleware: ['guest'],
});

const router = useRouter();
const auth = useAuth();

const form = ref({
    email: '',
    password: '',
});

const loading = ref(false);

const login = () => {
    loading.value = true;
    useCustomFetch(
            '/auth/tokens',
            {
                method: 'POST',
                body: form.value,
            }
        )
        .then(({data, error}) => {
            if (error.value) {
                console.log(error.value);
            }
            else {
                const { user, token } = data.value;
                auth.setUser(user);
                auth.setToken(token);
                router.push('/profile');
            }
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>