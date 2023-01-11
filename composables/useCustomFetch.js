export const useCustomFetch = async (url, options = {}) => {

    const configs = useRuntimeConfig();
    const headers = options?.headers || {};

    if (process.server) {
        // Laravel throttle middleware ip
        headers['X-Forwarded-For'] = useRequestHeaders()['x-forwarded-for-nuxt'];
    }

    options['headers'] = headers;

    const { data, error, refresh } = await useFetch(
        url,
        {
            baseURL: configs.public.apiBaseURL,
            ...options,
        }
    );

    if (error.value) {
        return Promise.reject(error.value, refresh);
    }
    else {
        return Promise.resolve(data.value);
    }
}