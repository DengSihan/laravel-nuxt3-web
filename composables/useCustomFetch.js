import { useAuth } from '~/store/auth.js';

export const useCustomFetch = async (url, options = {}) => {

    const auth = useAuth();
    const configs = useRuntimeConfig();
    const headers = options?.headers || {};

    if (process.server) {
        // Laravel throttle middleware ip
        headers['X-Forwarded-For'] = useRequestHeaders()['x-forwarded-for-nuxt'];
    }

    if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`;
    }

    options['headers'] = headers;

    const response = await useFetch(
        url,
        {
            baseURL: configs.public.apiBaseURL,
            ...options,
        }
    );

    if (response.error.value) {
        // handle the error unifiedly
    }

    return response;
}