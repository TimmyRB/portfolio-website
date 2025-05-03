"use server";

import {
  Technology,
  Language,
  Platform,
  Project,
} from "@/lib/contentful-types";

import { getEntries } from "@/lib/contentful";

export async function getProjects() {
  return await getEntries<Project[]>({
    contentType: "projects",
    query: {
      order: "-fields.year",
    },
  });
}

export async function getPlatforms() {
  return await getEntries<Platform[]>({
    contentType: "platform",
    query: {
      order: "fields.name",
    },
  });
}

export async function getLanguages() {
  return await getEntries<Language[]>({
    contentType: "category",
    query: {
      order: "fields.name",
    },
  });
}

export async function getTechnologies() {
  return await getEntries<Technology[]>({
    contentType: "technologies",
    query: {
      order: "fields.name",
    },
  });
}
