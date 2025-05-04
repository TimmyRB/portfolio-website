"use server";

import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Generic function to fetch entries
export async function getEntries<T>({
    contentType,
    query = {},
}: {
    contentType: string;
    query?: any;
}) {
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
}: {
    contentType: string;
    slug: string;
}) {
    const entries = await client.getEntries({
        content_type: contentType,
        'fields.slug': slug,
        limit: 1,
    });

    return entries.items[0] as unknown as T;
} 