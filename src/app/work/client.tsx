"use client";

import React, { useState, useRef } from "react";
import {
  Language,
  Platform,
  Project,
  Technology,
} from "@/lib/contentful-types";

import ProjectCard from "@/components/project-card";

import ProjectFilters, {
  ProjectFiltersRef,
} from "@/components/project-filters";

import { WobbleCard } from "@/components/ui/wobble-card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

export default function WorkClient({
  platforms,
  languages,
  technologies,
  projects,
}: {
  platforms: Platform[];
  languages: Language[];
  technologies: Technology[];
  projects: Project[];
}) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [hasFiltered, setHasFiltered] = useState(false);
  const filtersRef = useRef<ProjectFiltersRef>(null);

  function handlePlatformChange(value: string[]) {
    setSelectedPlatforms(value);
    applyFilters(value, selectedLanguages, selectedTechnologies);
    setHasFiltered(true);
  }

  function handleLanguageChange(value: string[]) {
    setSelectedLanguages(value);
    applyFilters(selectedPlatforms, value, selectedTechnologies);
    setHasFiltered(true);
  }

  function handleTechnologyChange(value: string[]) {
    setSelectedTechnologies(value);
    applyFilters(selectedPlatforms, selectedLanguages, value);
    setHasFiltered(true);
  }

  function applyFilters(
    platformNames: string[],
    languageNames: string[],
    technologyNames: string[]
  ) {
    let result = [...projects];

    if (platformNames.length > 0) {
      result = result.filter((project) =>
        project.fields.platforms?.some((platform) =>
          platformNames.includes(platform.fields.name)
        )
      );
    }

    if (languageNames.length > 0) {
      result = result.filter((project) =>
        project.fields.languages?.some((language) =>
          languageNames.includes(language.fields.name)
        )
      );
    }

    if (technologyNames.length > 0) {
      result = result.filter((project) =>
        project.fields.technologies?.some((technology) =>
          technologyNames.includes(technology.fields.name)
        )
      );
    }

    setFilteredProjects(result);
  }

  function resetFilters() {
    // Reset the filter component via the ref
    if (filtersRef.current) {
      filtersRef.current.reset();
    }

    // Reset local state
    setSelectedPlatforms([]);
    setSelectedLanguages([]);
    setSelectedTechnologies([]);
    setFilteredProjects(projects);
    setHasFiltered(false);
  }

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-4xl font-bold">Work</h1>
        <ProjectFilters
          ref={filtersRef}
          platforms={platforms}
          languages={languages}
          technologies={technologies}
          platformChange={handlePlatformChange}
          languageChange={handleLanguageChange}
          technologyChange={handleTechnologyChange}
        />
      </div>
      <LayoutGroup>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          layout="position"
          transition={{
            layout: { duration: 0.6, type: "spring", bounce: 0.2 },
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.sys.id}
                layoutId={`project-${project.sys.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 },
                  layout: {
                    duration: 0.6,
                    type: "spring",
                    bounce: 0.2,
                    damping: 15,
                    stiffness: 100,
                  },
                }}
                className="w-full h-full"
              >
                <ProjectCard project={project} disableAnimation={hasFiltered} />
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-full"
              >
                <div className="relative z-10 pointer-events-auto">
                  <WobbleCard containerClassName="w-full h-full bg-zinc-700 dark:bg-zinc-900">
                    <h2 className="text-left text-2xl font-bold text-white">
                      No projects found
                    </h2>
                    <p className="text-left text-neutral-200">
                      Try changing your filters.
                    </p>
                    <div className="relative z-20">
                      <Button
                        variant="default"
                        size="sm"
                        className="mt-4 relative z-30 cursor-pointer"
                        onClick={resetFilters}
                      >
                        Reset filters
                      </Button>
                    </div>
                  </WobbleCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
