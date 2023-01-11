import { useAuth } from '~/store/auth.js';

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useAuth();

    if (auth.isAuthed) {
        return navigateTo({
            name: 'index',
        });
    }
});