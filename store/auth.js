import { defineStore } from 'pinia';
import { useCustomFetch } from '~/composables/useCustomFetch.js';
import cookie from 'js-cookie';

export const useAuth = defineStore('auth', {

    state: () => ({
        _token: '',
        _user: {},
    }),

    getters: {
        token() {
            return this._token;
        },
        user() {
            return this._user;
        },
        isAuthed() {
            return Object.keys(this._user).length > 0;
        },
    },

    actions: {
        setToken(token) {
            this._token = token;
            cookie.set('token', token, { expires: 7 });
        },
        setUser(user) {
            this._user = user;
        },
        reset() {
            this._token = '';
            this._user = {};
            cookie.remove('token');
        },
        async fetchUser() {
            const { data, error } = await useCustomFetch('/auth/user');
            if (error.value) {
                this.reset();
            }
            else {
                this.setUser(data.value);
            }
        },
        async logout() {
            const { error } = await useCustomFetch(
                '/auth/token',
                {
                    method: 'DELETE',
                }
            );
            if (!error.value) {
                this.reset();
            }
        }
    },

});