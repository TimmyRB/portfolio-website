"use client";

import {
  SiBitbucket,
  SiDart,
  SiGithub,
  SiGitlab,
  SiYarn,
  SiNpm,
  SiPypi,
  SiThunderstore,
  SiSteam,
  SiItchdotio,
  SiDevpost,
} from "@icons-pack/react-simple-icons";
import { LinkPreview } from "@/components/ui/link-preview";
import { Link2Icon, ExternalLinkIcon } from "lucide-react";
import { cn } from "../lib/utils";

export default function ProjectLink({
  url,
  size,
  showFullName = false,
  className,
  textClassName,
}: {
  url: string;
  size: number;
  showFullName?: boolean;
  className?: string;
  textClassName?: string;
}) {
  const uri = new URL(url);
  const name = LinkName(uri, showFullName);
  const icon = LinkIcon(uri, size);

  return (
    <LinkPreview
      url={url}
      className={cn("flex flex-row items-center gap-2", className)}
    >
      {icon}
      <p className={cn("text-sm", textClassName)}>{name}</p>
      <ExternalLinkIcon size={size} />
    </LinkPreview>
  );
}

function LinkName(url: URL, showFullName: boolean) {
  const pathname = url.pathname.replace("/", "");
  switch (url.host) {
    case "github.com":
      return showFullName ? `GitHub - ${pathname}` : "GitHub";
    case "gitlab.com":
      return showFullName ? `GitLab - ${pathname}` : "GitLab";
    case "bitbucket.org":
      return showFullName ? `Bitbucket - ${pathname}` : "Bitbucket";
    case "gitlab.com":
      return "GitLab";
    case "bitbucket.org":
      return "Bitbucket";
    case "pub.dev":
      return "Pub.dev";
    case "npmjs.com":
      return "NPM";
    case "yarnpkg.com":
      return "Yarn";
    case "pypi.org":
      return "PyPI";
    case "thunderstore.io":
      return "Thunderstore";
    case "itch.io":
      return "itch.io";
    case "steamcommunity.com":
      return "Steam";
    case "devpost.com":
      return "Devpost";
    default:
      return url.host;
  }
}

function LinkIcon(url: URL, size: number) {
  switch (url.host) {
    case "github.com":
      return <SiGithub size={size} />;
    case "gitlab.com":
      return <SiGitlab size={size} />;
    case "bitbucket.org":
      return <SiBitbucket size={size} />;
    case "pub.dev":
      return <SiDart size={size} />;
    case "npmjs.com":
      return <SiNpm size={size} />;
    case "yarnpkg.com":
      return <SiYarn size={size} />;
    case "pypi.org":
      return <SiPypi size={size} />;
    case "thunderstore.io":
      return <SiThunderstore size={size} />;
    case "itch.io":
      return <SiItchdotio size={size} />;
    case "steamcommunity.com":
      return <SiSteam size={size} />;
    case "devpost.com":
      return <SiDevpost size={size} />;
    default:
      return <Link2Icon size={size} />;
  }
}
