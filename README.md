# Nuxt3 SSR Example with Authorization

Server Side Rendering Nuxt3 with Authorization: [Online Demo](https://laravel-nuxt3.ruti.page), API via Laravel.

## Features
- SSR Nuxt3 with authorization
- Tailwindcss
- Auth + guest middlewares
- Wrappered `useFeatch()`
- Test SSR content via [Vitest](https://vitest.dev/)

## Installation
    
```bash
// dev
yarn && yarn dev

// prod
yarn && yarn build && yarn preview
```

## Deploy

Deployed via pm2

```bash
#!/bin/bash

old_port=3001
new_port=3000

# check which port nuxtjs is running
is_3000_using=$(lsof -t -i:3000)
if [ -n "$is_3000_using" ]; then
	old_port=3000
	new_port=3001
fi

echo "the old port is $old_port, the new will be set on $new_port"

# update .env
sed -i "s/$old_port/$new_port/g" .env

echo ".env updated!"

yarn

echo "yarn installed!"

#build
build=$(yarn build)
if [[ $result =~ "ERR" ]]; then
	echo "--$build"
else
	pm2 start yarn --name "nuxt-$new_port" -- run preview

	echo "yarn preview"

	# update nginx
	sed -i "s/$old_port/$new_port/g" "/etc/nginx/sites-available/laravel-nuxt3.conf"
	service nginx restart

	echo "nginx updated!"

	old_pm2_process=$(pm2 list | grep "nuxt-$old_port")
	if [ -n "$old_pm2_process" ]; then
        pm2 delete "nuxt-$old_port"
    fi

    echo "pm2 updated!"
fi
```

## Todos

- Typescript
- Impove Test Coverage





