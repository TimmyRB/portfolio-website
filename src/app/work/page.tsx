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
    description: "Jacob Brasil's Work",
    openGraph: {
      title: "Jacob Brasil - Work",
      description: "Jacob Brasil's Work",
      images: projects.map((project) => ({
        url: project.fields.image.fields.file.url,
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
