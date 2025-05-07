import {
  getPlatforms,
  getLanguages,
  getTechnologies,
  getProjects,
} from "./server";
import WorkClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Jacob Brasil",
  description: "A collection of projects I've worked on",
  openGraph: {
    title: "Work - Jacob Brasil",
    description: "A collection of projects I've worked on",
    images: [{ url: "https://jacobbrasil.com/logo-bg.png" }],
  },
};

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
