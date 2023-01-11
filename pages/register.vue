<template>
    <main>
        <form
            @submit.prevent="register">

            <label
                for="name">
                name
            </label>
            <input
                id="name"
                type="text"
                name="name"
                v-model="form.name"
                required>
            
            <label
                for="email">
                email
            </label>
            <input
                id="email"
                type="email"
                name="email"
                v-model="form.email"
                required>

            <label
                for="password">
                password
            </label>
            <input
                id="password"
                type="password"
                name="password"
                v-model="form.password"
                required>

            <label
                for="password_confirmation">
                password confirmation
            </label>
            <input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                v-model="form.password_confirmation"
                required>

            <button
                type="submit"
                :disabled="loading">
                register
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
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const loading = ref(false);

const register = () => {
    loading.value = true;
    useCustomFetch(
            '/auth/user',
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