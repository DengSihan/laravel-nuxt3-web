// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    server: {
        port: 3000,
    },

    runtimeConfig: {
        public: {
            apiBaseURL: process.env.API_BASE_URL || 'http://laravel-nuxt3.test/api',
            availableSocialProviders: (process.env.AVAILABLE_SOCIAL_PROVIDERS || 'github').split(','),
        },
    },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
    ],

    css: [
        '@mdi/font/css/materialdesignicons.css',
        '~/assets/css/app.scss',
    ],

    tailwindcss: {
        exposeConfig: true
    },

    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
});
