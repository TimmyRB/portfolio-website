"use server";

import { getEntries } from "@/lib/contentful";
import { About } from "@/lib/contentful-types";

export async function getAbout(): Promise<About> {
  const entries = await getEntries<About[]>({
    contentType: "about",
  });

  return entries[0];
}
