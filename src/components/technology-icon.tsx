"use client";

import { WrenchIcon, ExternalLinkIcon } from "lucide-react";

import {
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiUnity,
  SiUnrealengine,
  SiVuedotjs,
  SiNodedotjs,
  SiFirebase,
  SiMongodb,
  SiExpress,
  SiCockroachlabs,
  SiAngular,
  SiPostgresql,
  SiSvelte,
} from "@icons-pack/react-simple-icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import { LinkPreview } from "./ui/link-preview";

export default function TechnologyIcon({
  technology,
  size = 16,
  showLabel = false,
  link,
}: {
  technology: string;
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
              {getTechnologyIcon(technology, size)}
              {showLabel && technology}
              {link && <ExternalLinkIcon size={size} />}
            </div>
          </TooltipTrigger>
          {!showLabel && <TooltipContent>{technology}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </LinkPreview>
  );
}

function getTechnologyIcon(technology: string, size: number) {
  if (!technology) {
    return <WrenchIcon size={size} />;
  }

  switch (technology.toLowerCase()) {
    case "flutter":
      return <SiFlutter size={size} />;
    case "react":
      return <SiReact size={size} />;
    case "next.js":
      return <SiNextdotjs size={size} />;
    case "nest.js":
      return <SiNestjs size={size} />;
    case "unity":
      return <SiUnity size={size} />;
    case "unreal engine":
      return <SiUnrealengine size={size} />;
    case "vue":
      return <SiVuedotjs size={size} />;
    case "node.js":
      return <SiNodedotjs size={size} />;
    case "firebase":
      return <SiFirebase size={size} />;
    case "mongodb":
      return <SiMongodb size={size} />;
    case "express":
      return <SiExpress size={size} />;
    case "cockroachdb":
      return <SiCockroachlabs size={size} />;
    case "angular":
      return <SiAngular size={size} />;
    case "postgresql":
      return <SiPostgresql size={size} />;
    case "svelte":
      return <SiSvelte size={size} />;
    default:
      return <WrenchIcon size={size} />;
  }
}
