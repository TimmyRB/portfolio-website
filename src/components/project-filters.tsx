"use client";

import { useState, useImperativeHandle, forwardRef } from "react";
import { Language, Platform, Technology } from "@/lib/contentful-types";
import PlatformIcon from "@/components/platform-icon";
import LanguageIcon from "@/components/language-icon";
import TechnologyIcon from "@/components/technology-icon";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandInput,
  CommandList,
} from "./ui/command";
import { Checkbox } from "./ui/checkbox";

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

  const [platsIsOpen, setPlatsIsOpen] = useState(false);
  const [langsIsOpen, setLangsIsOpen] = useState(false);
  const [techsIsOpen, setTechsIsOpen] = useState(false);

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

      // Close all popovers
      setPlatsIsOpen(false);
      setLangsIsOpen(false);
      setTechsIsOpen(false);
    },
  }));

  function handlePlatformSelect(value: string) {
    let newSelectedPlats: string[];
    if (selectedPlats.includes(value)) {
      newSelectedPlats = selectedPlats.filter((plat) => plat !== value);
    } else {
      newSelectedPlats = [...selectedPlats, value];
    }
    setSelectedPlats(newSelectedPlats);
    platformChange(newSelectedPlats);
  }

  function handleLanguageSelect(value: string) {
    let newSelectedLangs: string[];
    if (selectedLangs.includes(value)) {
      newSelectedLangs = selectedLangs.filter((lang) => lang !== value);
    } else {
      newSelectedLangs = [...selectedLangs, value];
    }
    setSelectedLangs(newSelectedLangs);
    languageChange(newSelectedLangs);
  }

  function handleTechnologySelect(value: string) {
    let newSelectedTechs: string[];
    if (selectedTechs.includes(value)) {
      newSelectedTechs = selectedTechs.filter((tech) => tech !== value);
    } else {
      newSelectedTechs = [...selectedTechs, value];
    }
    setSelectedTechs(newSelectedTechs);
    technologyChange(newSelectedTechs);
  }

  return (
    <div className="flex flex-row justify-between gap-4">
      <Popover open={platsIsOpen} onOpenChange={setPlatsIsOpen}>
        <PopoverTrigger asChild className="flex-1">
          <Button variant="outline" role="combobox">
            Platforms
            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] max-h-[250px] overflow-y-auto p-0">
          <Command>
            <CommandInput placeholder="Search platforms..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {platforms.map((platform) => (
                  <CommandItem
                    key={platform.sys.id}
                    value={platform.fields.name}
                    onSelect={handlePlatformSelect}
                  >
                    <Checkbox
                      checked={selectedPlats.includes(platform.fields.name)}
                      value={platform.fields.name}
                    />
                    <PlatformIcon platform={platform.fields.name} showLabel />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={langsIsOpen} onOpenChange={setLangsIsOpen}>
        <PopoverTrigger asChild className="flex-1">
          <Button variant="outline" role="combobox">
            Languages
            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] max-h-[250px] overflow-y-auto p-0">
          <Command>
            <CommandInput placeholder="Search languages..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.sys.id}
                    value={language.fields.name}
                    onSelect={handleLanguageSelect}
                  >
                    <Checkbox
                      checked={selectedLangs.includes(language.fields.name)}
                      value={language.fields.name}
                    />
                    <LanguageIcon language={language.fields.name} showLabel />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={techsIsOpen} onOpenChange={setTechsIsOpen}>
        <PopoverTrigger asChild className="flex-1">
          <Button variant="outline" role="combobox">
            Technologies
            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] max-h-[250px] overflow-y-auto p-0">
          <Command>
            <CommandInput placeholder="Search technologies..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {technologies.map((technology) => (
                  <CommandItem
                    key={technology.sys.id}
                    value={technology.fields.name}
                    onSelect={handleTechnologySelect}
                  >
                    <Checkbox
                      checked={selectedTechs.includes(technology.fields.name)}
                      value={technology.fields.name}
                    />
                    <TechnologyIcon
                      technology={technology.fields.name}
                      showLabel
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
});

export default ProjectFilters;
