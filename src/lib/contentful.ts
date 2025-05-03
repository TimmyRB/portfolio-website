"use server";

import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// The default client uses the Content Delivery API
const previewClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || '',
    host: 'preview.contentful.com',
});

// Helper function to determine which client to use
function getClient(preview: boolean = false) {
    return preview ? previewClient : client;
}

// Generic function to fetch entries
export async function getEntries<T>({
    contentType,
    preview = false,
    query = {},
}: {
    contentType: string;
    preview?: boolean;
    query?: any;
}) {
    const client = getClient(preview);

    const entries = await client.getEntries({
        content_type: contentType,
        ...query,
    });


    return entries.items as unknown as T;
}

// Helper function to fetch a single entry by slug
export async function getEntryBySlug<T>({
    contentType,
    slug,
    preview = false,
}: {
    contentType: string;
    slug: string;
    preview?: boolean;
}) {
    const client = getClient(preview);

    const entries = await client.getEntries({
        content_type: contentType,
        'fields.slug': slug,
        limit: 1,
    });

    return entries.items[0] as unknown as T;
} 