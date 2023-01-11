import { defineNuxtPlugin } from '#app';
import { useAuth } from '~/store/auth.js';

function cookieFromRequestHeaders (key) {
    const headers = useRequestHeaders(['cookie']);
    if ('cookie' in headers) {
        const cookie = headers.cookie.split(';').find(
            c => c.trim().startsWith(`${key}=`)
        );
        if (cookie) {
            return cookie.split('=')[1];
        }
    }
    return '';
}

export default defineNuxtPlugin(async (nuxtApp) => {

    const token = cookieFromRequestHeaders('token');

    if (token) {
        const auth = useAuth(nuxtApp.$pinia);
        auth.setToken(token);
        await auth.fetchUser();
    }
});