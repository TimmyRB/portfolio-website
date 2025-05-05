import { getEntries } from "@/lib/contentful";
import { Project } from "@/lib/contentful-types";
import WorkClient from "./client";
import { getProject } from "./server";
import { Metadata } from "next";

export async function generateStaticParams() {
  const projects = await getEntries<Project[]>({
    contentType: "projects",
  });

  return projects.map((project) => ({
    slug: project.fields.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  return {
    title: `Jacob Brasil - ${project.fields.title}`,
    description: project.fields.description,
    openGraph: {
      title: `Jacob Brasil - ${project.fields.title}`,
      description: project.fields.description,
      images: [{ url: project.fields.image.fields.file.url }],
    },
  };
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
