"use client";

import {
  Language,
  Platform,
  Project,
  Technology,
} from "@/lib/contentful-types";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Tag from "./tag";
import PlatformIcon from "./platform-icon";
import TechnologyIcon from "./technology-icon";
import LanguageIcon from "./language-icon";
import AutoScroll from "./auto-scroll";

export default function ProjectCard({
  project,
  disableAnimation = false,
}: {
  project: Project;
  disableAnimation?: boolean;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  const hasPlatforms =
    project.fields.platforms && project.fields.platforms.length > 0;
  const hasLanguages =
    project.fields.languages && project.fields.languages.length > 0;
  const hasTechnologies =
    project.fields.technologies && project.fields.technologies.length > 0;

  const CardWrapper = disableAnimation ? "div" : motion.div;
  const animationProps = !disableAnimation
    ? {
        initial: { opacity: 0, y: 100 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px 70px 0px" },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <CardWrapper
      {...animationProps}
      className="w-full h-[224px] rounded-lg overflow-hidden shadow-xl relative"
    >
      <Link href={`/work/${project.fields.slug}`}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setMousePosition({ x: 0, y: 0 });
          }}
          style={{
            transform: isHovering
              ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className="relative w-full h-full"
        >
          <Image
            src={`https:${project.fields.image.fields.file.url}`}
            alt={project.fields.title}
            width={512}
            height={512}
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-all duration-100"
          />
        </motion.div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-5 pointer-events-none" />
        <AutoScroll
          className="absolute flex flex-row gap-2 bottom-0 left-0 z-10 p-2"
          direction="horizontal"
        >
          <Tag>{project.fields.title}</Tag>
          {hasPlatforms || hasLanguages || hasTechnologies ? (
            <Tag>
              {hasPlatforms && platformTags(project.fields.platforms)}
              {hasPlatforms && hasLanguages && "|"}
              {hasLanguages && languageTags(project.fields.languages)}
              {hasLanguages && hasTechnologies && "|"}
              {hasTechnologies && technologyTags(project.fields.technologies)}
            </Tag>
          ) : null}
          <Tag>{project.fields.year}</Tag>
        </AutoScroll>
      </Link>
    </CardWrapper>
  );
}

function platformTags(platforms: Platform[]) {
  if (!platforms || platforms.length === 0) return null;

  return platforms.map((platform) => (
    <PlatformIcon key={platform.sys.id} platform={platform.fields.name} />
  ));
}

function languageTags(languages: Language[]) {
  if (!languages || languages.length === 0) return null;

  return languages.map((language) => (
    <LanguageIcon key={language.sys.id} language={language.fields.name} />
  ));
}

function technologyTags(technologies: Technology[]) {
  if (!technologies || technologies.length === 0) return null;

  return technologies.map((technology) => (
    <TechnologyIcon
      key={technology.sys.id}
      technology={technology.fields.name}
    />
  ));
}
