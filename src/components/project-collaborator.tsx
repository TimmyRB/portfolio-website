"use client";

import { Collaborator } from "@/lib/contentful-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { LinkPreview } from "./ui/link-preview";

export default function ProjectCollaborator({
  collaborator,
}: {
  collaborator: Collaborator;
}) {
  return (
    <LinkPreview url={collaborator.fields.link}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="border-2 border-zinc-300 dark:border-zinc-700">
              <AvatarImage src={collaborator.fields.image.fields.file.url} />
              <AvatarFallback>
                {collaborator.fields.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="left">
            {collaborator.fields.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </LinkPreview>
  );
}
