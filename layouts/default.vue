<template>
    <main
        class="mx-auto w-[600px] my-16">
        <h1
            class="text-xl font-bold my-8">
            Nuxt3 + Laravel Basic SSR Example with Authorization
        </h1>
        <p
            class="my-4">
            <i
                class="mdi mdi-github"></i>
            source code: 
            <a
                class="mx-2"
                target="_blank"
                href="https://github.com/DengSihan/laravel-nuxt3-web">web(Nuxt3)</a>
            <a
                class="mx-2"
                target="_blank"
                href="https://github.com/DengSihan/laravel-nuxt3-api">api(Laravel)</a>
        </p>
        <hr>
        <slot/>
    </main>
</template>