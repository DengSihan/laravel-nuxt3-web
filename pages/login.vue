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
        @submit.prevent="login">

        <custom-input
            placeholder="Email"
            name="email"
            type="email"
            v-model="form.email"
            required/>
        
        <custom-input
            placeholder="Password"
            name="password"
            type="password"
            v-model="form.password"
            required/>

        <button
            type="submit"
            class="btn bg-blue-500 hover:bg-blue-600 text-white"
            :disabled="loading">
            login
            <i
                class="mdi mdi-login-variant"></i>
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
const route = useRoute();
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
                router.push(
                    route.query?.redirect || '/'
                );
            }
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>