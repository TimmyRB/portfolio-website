"use server";

import { getEntries } from "@/lib/contentful";
import { Project } from "@/lib/contentful-types";

export async function getProjects() {
  const entries = await getEntries<Project[]>({
    contentType: "projects",
    query: {
      order: "-fields.year",
      limit: 3,
    },
  });
  return entries;
}
