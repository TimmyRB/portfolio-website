"use server";

import { getEntryBySlug } from "@/lib/contentful";
import { Project } from "@/lib/contentful-types";

export async function getProject(slug: string) {
  return await getEntryBySlug<Project>({
    slug,
    contentType: "projects",
  });
}
