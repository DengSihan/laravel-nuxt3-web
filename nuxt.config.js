// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    runtimeConfig: {
        public: {
            apiBaseURL: process.env.API_BASE_URL || 'http://laravel-nuxt3.test/api',
            availableSocialProviders: (process.env.AVAILABLE_SOCIAL_PROVIDERS || 'google,facebook').split(','),
        },
    },

    modules: [
        '@pinia/nuxt',
    ],

    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
});
