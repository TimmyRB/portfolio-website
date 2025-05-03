import { getEntries } from "@/lib/contentful";
import { Project } from "@/lib/contentful-types";
import WorkClient from "./client";
import { getProject } from "./server";

export async function generateStaticParams() {
  const projects = await getEntries<Project[]>({
    contentType: "projects",
  });

  return projects.map((project) => ({
    slug: project.fields.slug,
  }));
}

export default async function Work({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  return <WorkClient project={project} />;
}
