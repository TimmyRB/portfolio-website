import {
  getPlatforms,
  getLanguages,
  getTechnologies,
  getProjects,
} from "./server";
import WorkClient from "./client";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getProjects();

  return {
    title: "Jacob Brasil - Work",
    description: "A collection of projects I've worked on",
    openGraph: {
      title: "Jacob Brasil - Work",
      description: "A collection of projects I've worked on",
      images: projects.map((project) => ({
        url: `https://${project.fields.image.fields.file.url}`,
      })),
    },
  };
}

export default async function WorkPage() {
  const platforms = await getPlatforms();
  const languages = await getLanguages();
  const technologies = await getTechnologies();
  const projects = await getProjects();

  return (
    <WorkClient
      platforms={platforms}
      languages={languages}
      technologies={technologies}
      projects={projects}
    />
  );
}
