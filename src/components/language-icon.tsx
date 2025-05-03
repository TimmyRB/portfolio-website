"use client";

import { Code2Icon, ExternalLinkIcon } from "lucide-react";

import {
  SiTypescript,
  SiJavascript,
  SiDart,
  SiKotlin,
  SiPython,
  SiC,
  SiCplusplus,
  SiSwift,
} from "@icons-pack/react-simple-icons";

import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import { LinkPreview } from "./ui/link-preview";
import CSharpIcon from "./csharp-icon";

export default function LanguageIcon({
  language,
  size = 16,
  showLabel = false,
  link,
}: {
  language: string;
  size?: number;
  showLabel?: boolean;
  link?: string;
}) {
  return (
    <LinkPreview url={link ?? ""}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-row gap-2 items-center">
              {getLanguageIcon(language, size)}
              {showLabel && language}
              {link && <ExternalLinkIcon size={size} />}
            </div>
          </TooltipTrigger>
          {!showLabel && <TooltipContent>{language}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </LinkPreview>
  );
}

function getLanguageIcon(language: string, size: number) {
  if (!language) {
    return <Code2Icon size={size} />;
  }

  switch (language.toLowerCase()) {
    case "typescript":
      return <SiTypescript size={size} />;
    case "javascript":
      return <SiJavascript size={size} />;
    case "dart":
      return <SiDart size={size} />;
    case "kotlin":
      return <SiKotlin size={size} />;
    case "python":
      return <SiPython size={size} />;
    case "c":
      return <SiC size={size} />;
    case "c++":
      return <SiCplusplus size={size} />;
    case "swift":
      return <SiSwift size={size} />;
    case "c#":
      return <CSharpIcon width={size} height={size} />;
    default:
      return <Code2Icon size={size} />;
  }
}
