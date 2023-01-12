import { describe, test, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

describe('page has server side rendered client ip and user agent', async () => {

    await setup();

    test('should render client ip and user agent', async () => {
        const html = await $fetch('/');
        
        expect(html).toContain('Client IP');
    });
});