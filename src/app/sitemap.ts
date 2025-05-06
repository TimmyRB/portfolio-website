import type { MetadataRoute } from 'next'
import { Project } from '@/lib/contentful-types';
import { getEntries } from '../lib/contentful';

async function getProjects(): Promise<Project[]> {
    const projects = await getEntries<Project[]>({
        contentType: "projects",
    });
    return projects;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await getProjects();
    const workSitemap: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `https://jacobbrasil.com/work/${project.fields.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        images: [`https:${project.fields.image.fields.file.url}`],
    }));

    return [
        {
            url: "https://jacobbrasil.com",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: 'https://jacobbrasil.com/work',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://jacobbrasil.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...workSitemap,
    ]
}