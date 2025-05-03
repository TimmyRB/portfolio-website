"use client";

import { Project } from "@/lib/contentful-types";
import { Separator } from "@/components/ui/separator";
import PlatformIcon from "@/components/platform-icon";
import LanguageIcon from "@/components/language-icon";
import TechnologyIcon from "@/components/technology-icon";
import ProjectLink from "@/components/project-link";
import ProjectCollaborator from "@/components/project-collaborator";

export default function ProjectIngredients({ project }: { project: Project }) {
  const hasLinks: boolean =
    project.fields.links && project.fields.links.length > 0;
  const hasPlatforms: boolean =
    project.fields.platforms && project.fields.platforms.length > 0;
  const hasLanguages: boolean =
    project.fields.languages && project.fields.languages.length > 0;
  const hasTechnologies: boolean =
    project.fields.technologies && project.fields.technologies.length > 0;
  const hasCollaborators: boolean =
    project.fields.collaborators && project.fields.collaborators.length > 0;

  let gridCols: number = 0;
  if (hasPlatforms) gridCols++;
  if (hasLanguages) gridCols++;
  if (hasTechnologies) gridCols++;

  return (
    <div className="flex flex-col gap-2 w-full bg-zinc-100 dark:bg-zinc-900 py-2 rounded-lg">
      <div className="flex flex-row justify-between items-center gap-2 px-4">
        <div className="flex flex-row items-end gap-x-2">
          <h1 className="text-xl font-bold text-nowrap">
            {project.fields.title}
          </h1>
          <h2 className="text-md text-zinc-500 dark:text-zinc-400 font-bold">
            {project.fields.year}
          </h2>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-end gap-x-2">
          {hasLinks &&
            project.fields.links.map((link) => (
              <ProjectLink url={link} size={16} />
            ))}
        </div>
      </div>

      <Separator />

      <div className={`grid grid-cols-2 md:grid-cols-${gridCols}`}>
        {hasPlatforms && (
          <>
            {/* Platforms */}
            <div className="flex flex-col px-4">
              <h3 className="text-md text-zinc-500 dark:text-zinc-400 font-bold">
                Platforms
              </h3>
              <div className="flex flex-row flex-wrap gap-x-2">
                {project.fields.platforms.map((platform) => (
                  <PlatformIcon
                    key={platform.sys.id}
                    platform={platform.fields.name}
                    showLabel
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {hasLanguages && (
          <>
            {/* Languages */}
            <div className="flex flex-row gap-2 px-4">
              {hasPlatforms && <Separator orientation="vertical" />}
              <div className="flex flex-col justify-start">
                <h3 className="text-md text-zinc-500 dark:text-zinc-400 font-bold">
                  Languages
                </h3>
                <div className="flex flex-row flex-wrap gap-x-2">
                  {project.fields.languages.map((language) => (
                    <LanguageIcon
                      key={language.sys.id}
                      language={language.fields.name}
                      link={language.fields.link}
                      showLabel
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {hasTechnologies && (
          <>
            {/* Technologies */}
            <div className="flex flex-col col-span-2 md:col-span-1 md:flex-row gap-2">
              {(hasLanguages || hasPlatforms) && (
                <Separator orientation="vertical" className="hidden md:block" />
              )}
              <div className="flex flex-col">
                {(hasLanguages || hasPlatforms) && (
                  <Separator
                    orientation="horizontal"
                    className="block my-2 md:hidden"
                  />
                )}
                <h3 className="text-md text-zinc-500 dark:text-zinc-400 font-bold px-4">
                  Technologies
                </h3>
                <div className="flex flex-row flex-wrap gap-x-2 px-4">
                  {project.fields.technologies.map((technology) => (
                    <TechnologyIcon
                      key={technology.sys.id}
                      technology={technology.fields.name}
                      link={technology.fields.link}
                      showLabel
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Separator />

      <div className="flex flex-col">
        <h3 className="text-md text-zinc-500 dark:text-zinc-400 font-bold px-4">
          Overview
        </h3>
        <p className="px-4 text-sm">{project.fields.overview}</p>
      </div>

      {hasCollaborators && (
        <>
          <Separator />

          {/* Collaborators */}
          <div className="flex flex-row justify-between items-center px-4">
            <h3 className="text-md text-zinc-500 dark:text-zinc-400 font-bold">
              Collaborators
            </h3>
            <div className="flex flex-row flex-wrap gap-x-2">
              {project.fields.collaborators.map((collaborator) => (
                <ProjectCollaborator
                  key={collaborator.sys.id}
                  collaborator={collaborator}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
