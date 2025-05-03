"use client";

import { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { Language, Platform, Technology } from "@/lib/contentful-types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import PlatformIcon from "@/components/platform-icon";
import LanguageIcon from "@/components/language-icon";
import TechnologyIcon from "@/components/technology-icon";

// Define the ref type for external access
export type ProjectFiltersRef = {
  reset: () => void;
};

const ProjectFilters = forwardRef<
  ProjectFiltersRef,
  {
    platforms: Platform[];
    languages: Language[];
    technologies: Technology[];
    platformChange: (value: string[]) => void;
    languageChange: (value: string[]) => void;
    technologyChange: (value: string[]) => void;
  }
>(function ProjectFilters(
  {
    platforms,
    languages,
    technologies,
    platformChange,
    languageChange,
    technologyChange,
  },
  ref
) {
  const [selectedPlats, setSelectedPlats] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // Expose the reset function to parents via ref
  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelectedPlats([]);
      setSelectedLangs([]);
      setSelectedTechs([]);
      // Call change handlers with empty arrays
      platformChange([]);
      languageChange([]);
      technologyChange([]);
    },
  }));

  function handlePlatformChange(value: string[]) {
    setSelectedPlats(value);
    platformChange(value);
  }

  function handleLanguageChange(value: string[]) {
    setSelectedLangs(value);
    languageChange(value);
  }

  function handleTechnologyChange(value: string[]) {
    setSelectedTechs(value);
    technologyChange(value);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-bold text-zinc-600 dark:text-zinc-400">
          Platforms
        </h2>
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={selectedPlats}
          onValueChange={handlePlatformChange}
        >
          {platforms.map((platform) => (
            <ToggleGroupItem
              key={platform.sys.id}
              value={platform.sys.id}
              className="cursor-pointer"
            >
              <PlatformIcon platform={platform.fields.name} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-bold text-zinc-600 dark:text-zinc-400">
          Languages
        </h2>
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={selectedLangs}
          onValueChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <ToggleGroupItem
              key={language.sys.id}
              value={language.sys.id}
              className="cursor-pointer"
            >
              <LanguageIcon language={language.fields.name} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-bold text-zinc-600 dark:text-zinc-400">
          Technologies
        </h2>
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={selectedTechs}
          onValueChange={handleTechnologyChange}
        >
          {technologies.map((technology) => (
            <ToggleGroupItem
              key={technology.sys.id}
              value={technology.sys.id}
              className="cursor-pointer"
            >
              <TechnologyIcon technology={technology.fields.name} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
});

export default ProjectFilters;
