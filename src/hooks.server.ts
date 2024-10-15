
import type { Handle } from '@sveltejs/kit';
import { AppDataSource } from './data-source';

export const handle: Handle = async ({ event, resolve }) => {
    if (!AppDataSource.isInitialized) {
        AppDataSource.initialize();
    }
    // Custom logic before resolving the request
    const response = await resolve(event);
    // Custom logic after resolving the request
    return response;
};