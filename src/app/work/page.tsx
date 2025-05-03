import {
  getPlatforms,
  getLanguages,
  getTechnologies,
  getProjects,
} from "./server";
import WorkClient from "./client";

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
