<template>

    <nav
        class="my-4">
        <nuxt-link
            to="/">
            <i
                class="mdi mdi-home"></i>
            index
        </nuxt-link>
    </nav>

    <form
        class="my-4"
        @submit.prevent="register">

        <custom-input
            name="name"
            placeholder="Name"
            v-model="form.name"
            v-model:errors="errors.name"
            required/>

        <custom-input
            placeholder="Email"
            name="email"
            type="email"
            v-model="form.email"
            v-model:errors="errors.email"
            required/>
        
        <custom-input
            placeholder="Password"
            name="password"
            type="password"
            v-model="form.password"
            v-model:errors="errors.password"
            required/>

        <custom-input
            placeholder="Password Confirmation"
            name="password-confirmation"
            type="password"
            v-model="form.password_confirmation"
            v-model:errors="errors.password_confirmation"
            required/>

        <button
            type="submit"
            class="btn bg-blue-500 hover:bg-blue-600 text-white"
            :disabled="loading">
            register
            <i
                class="mdi mdi-account-plus"></i>
        </button>
        
    </form>

    <hr
        class="my-4">
        
    <auth-socials/>
    
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

const errors = ref({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
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
        .then(({data, error: httpErrors}) => {
            if (httpErrors.value) {
                errors.value = {
                    ...errors.value,
                    ...httpErrors.value.data.errors
                };
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