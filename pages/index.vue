<template>
    <main>
        <nav>
            <ul>
                <li>
                    <nuxt-link
                        to="/login">
                        login
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link
                        to="/register">
                        register
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link
                        to="/profile">
                        profile
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </main>
    <div>
        <code>
            <pre>{{ data }}</pre>
        </code>
    </div>
</template>

<script setup>
import { useCustomFetch } from '~/composables/useCustomFetch.js';

const { data } = await useCustomFetch('/client-info');
</script>