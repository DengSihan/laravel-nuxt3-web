export const useCustomFetch = async (url, options = {}) => {

    const configs = useRuntimeConfig();
    const headers = options?.headers || {};

    if (process.server) {
        // Laravel throttle middleware ip
        headers['X-Forwarded-For'] = useRequestHeaders()['x-forwarded-for-nuxt'];
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