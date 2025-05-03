"use client";

import {
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  RectangleGogglesIcon,
  GlobeIcon,
} from "lucide-react";

import {
  SiDiscord,
  SiSteam,
  SiPlaystation,
  SiApple,
  SiAppletv,
  SiApplearcade,
  SiAndroid,
} from "@icons-pack/react-simple-icons";

import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function PlatformIcon({
  platform,
  size = 16,
  showLabel = false,
  className,
}: {
  platform: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex flex-row gap-2 items-center", className)}>
            {getPlatformIcon(platform, size)}
            {showLabel && platform}
          </div>
        </TooltipTrigger>
        {!showLabel && <TooltipContent>{platform}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

function getPlatformIcon(platform: string, size: number) {
  if (!platform) {
    return <MonitorIcon size={size} />;
  }

  switch (platform.toLowerCase()) {
    case "web":
      return <GlobeIcon size={size} />;
    case "ar":
      return <RectangleGogglesIcon size={size} />;
    case "mobile":
      return <SmartphoneIcon size={size} />;
    case "tablet":
      return <TabletIcon size={size} />;
    case "discord":
      return <SiDiscord size={size} />;
    case "steam":
      return <SiSteam size={size} />;
    case "playstation":
      return <SiPlaystation size={size} />;
    default:
      return <MonitorIcon size={size} />;
  }
}
