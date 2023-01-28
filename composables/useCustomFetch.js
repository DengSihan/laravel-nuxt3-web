import { useAuth } from '~/store/auth.js';

export const useCustomFetch = async (url, options = {}) => {

    const auth = useAuth();
    const configs = useRuntimeConfig();
    const headers = options?.headers || {};

    if (process.server) {

        // don't pass all headers to server side or it may trigger the thorottle middleware wrongly
        const rawHeaders = useRequestHeaders();
        [
            'accept-language',
            'accept-encoding',
            'accept',
            'user-agent',
            'cache-control',
            'referer',
        ].forEach((key) => {
            if (rawHeaders[key]) {
                headers[key] = rawHeaders[key];
            }
        });
        
        // Laravel throttle middleware ip
        headers['X-Forwarded-For'] = rawHeaders['x-forwarded-for-nuxt'];
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