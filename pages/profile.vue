<template>
    <main>
        profile
    </main>
    <div>
        <code>
            <pre>{{ user }}</pre>
        </code>
    </div>
    <nav>
        <ul>
            <li>
                <nuxt-link
                    to="/">
                    index
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { useAuth } from '~/store/auth.js';

definePageMeta({
    middleware: ['auth'],
});

const { user } = useAuth();
</script>