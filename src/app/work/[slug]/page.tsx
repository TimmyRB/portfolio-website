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

  let tags: string[] = [];
  if (project.fields.platforms && project.fields.platforms.length > 0) {
    tags = tags.concat(
      project.fields.platforms.map((platform) => platform.fields.name)
    );
  }
  if (project.fields.languages && project.fields.languages.length > 0) {
    tags = tags.concat(
      project.fields.languages.map((language) => language.fields.name)
    );
  }
  if (project.fields.technologies && project.fields.technologies.length > 0) {
    tags = tags.concat(
      project.fields.technologies.map((technology) => technology.fields.name)
    );
  }

  return {
    title: `${project.fields.title} - Jacob Brasil`,
    description: project.fields.overview,
    openGraph: {
      title: `${project.fields.title} - Jacob Brasil`,
      description: project.fields.overview,
      images: [{ url: `https://${project.fields.image.fields.file.url}` }],
      siteName: "Jacob Brasil",
      url: `https://jacobbrasil.com/work/${project.fields.slug}`,
      type: "article",
      locale: "en_CA",
      publishedTime: project.sys.createdAt,
      modifiedTime: project.sys.updatedAt,
      section: "Technology",
      authors: ["Jacob Brasil"],
      tags: tags,
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
