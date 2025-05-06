// Contentful type definitions
export interface ContentfulEntry<T> {
    sys: {
        id: string;
        createdAt: string;
        updatedAt: string;
        contentType: {
            sys: {
                id: string;
            }
        }
    };
    fields: T;
}

export interface ContentfulImage {
    fields: {
        file: {
            url: string;
        }
    }
}

export interface ContentfulFile {
    fields: {
        file: {
            url: string;
        }
    }
}

export type ContentfulRichText = any;

export interface ProjectFields {
    title: string;
    slug: string;
    year: number;
    links: string[];
    image: ContentfulImage;
    languages: Language[];
    technologies: Technology[];
    platforms: Platform[];
    overview: string;
    description: ContentfulRichText;
    collaborators: Collaborator[];
}

export interface LanguageFields {
    name: string;
    link: string;
}

export interface TechnologyFields {
    name: string;
    link: string;
}

export interface PlatformFields {
    name: string;
}

export interface CollaboratorFields {
    name: string;
    image: ContentfulImage;
    link: string;
}

export interface ExperienceFields {
    company: string;
    title: string;
    logo: ContentfulImage;
    website: string;
    location: string;
    remote: boolean;
    startDate: string;
    endDate: string;
    description: string;
}

export interface EducationFields {
    name: string;
    program: string;
    logo: ContentfulImage;
    website: string;
    location: string;
    description: string;
}

export interface AboutFields {
    name: string;
    image: ContentfulImage;
    description: string;
    work: Experience[];
    education: Education[];
    resume: ContentfulFile;
}

export type Project = ContentfulEntry<ProjectFields>;
export type Language = ContentfulEntry<LanguageFields>;
export type Technology = ContentfulEntry<TechnologyFields>;
export type Platform = ContentfulEntry<PlatformFields>;
export type Collaborator = ContentfulEntry<CollaboratorFields>;
export type Experience = ContentfulEntry<ExperienceFields>;
export type Education = ContentfulEntry<EducationFields>;
export type About = ContentfulEntry<AboutFields>;

