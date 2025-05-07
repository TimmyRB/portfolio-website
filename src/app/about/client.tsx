"use client";

import { About } from "@/lib/contentful-types";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SlidingButton } from "@/components/sliding-button";
import { LinkPreview } from "../../components/ui/link-preview";

export default function AboutClient({ about }: { about: About }) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full gap-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">About me</h1>
          <Link
            href={`https://${about.fields.resume.fields.file.url}`}
            target="_blank"
          >
            <SlidingButton
              variant="outline"
              size="lg"
              text="Download CV"
              icon={<DownloadIcon />}
            />
          </Link>
        </div>

        <p className="text-md md:text-lg text-justify text-zinc-700 dark:text-zinc-200">
          {about.fields.description}
        </p>
        <Separator className="my-2" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 w-full"
      >
        <h3 className="text-xl md:text-2xl font-bold">Work Experience</h3>
        <div className="flex flex-col gap-8">
          {about.fields.work.map((experience) => (
            <motion.div
              key={experience.sys.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-row gap-4"
            >
              <div className="flex flex-col gap-2 items-center">
                <div className="min-w-4 min-h-4 p-1 rounded-full flex items-center justify-center border border-black/30 dark:border-white/30">
                  <div className="w-full h-full bg-black dark:bg-white rounded-full" />
                </div>
                <Separator orientation="vertical" />
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="flex-shrink-0 w-fit h-fit rounded-lg overflow-hidden flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 p-1 shadow-sm">
                  <Image
                    src={`https:${experience.fields.logo.fields.file.url}`}
                    alt={experience.fields.company}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain rounded-sm"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold">
                      {experience.fields.title}
                    </h3>
                    <LinkPreview
                      url={experience.fields.website}
                      className="max-w-fit"
                    >
                      <h4 className="flex flex-row items-center gap-2 text-md md:text-lg font-semibold text-zinc-500 dark:text-zinc-400">
                        {experience.fields.company}
                        <ExternalLinkIcon className="w-4 h-4" />
                      </h4>
                    </LinkPreview>
                  </div>
                  <p className="text-md md:text-lg text-zinc-700 dark:text-zinc-200 text-justify">
                    {experience.fields.description}
                  </p>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-zinc-500 dark:text-zinc-400 text-sm">
                    <span>
                      {formatDate(experience.fields.startDate)} -{" "}
                      {experience.fields.endDate
                        ? formatDate(experience.fields.endDate)
                        : "Present"}
                      {" • "}
                      {timeSpan(
                        experience.fields.startDate,
                        experience.fields.endDate
                      )}
                    </span>
                    <span>
                      {experience.fields.remote ? "Remote, " : ""}
                      {experience.fields.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Separator className="my-2" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 w-full"
      >
        <h3 className="text-xl md:text-2xl font-bold">Education</h3>
        <div className="flex flex-col gap-8">
          {about.fields.education.map((education) => (
            <div key={education.sys.id} className="flex flex-row gap-4">
              <div className="flex flex-col gap-2 items-center">
                <div className="min-w-4 min-h-4 p-1 rounded-full flex items-center justify-center border border-black/30 dark:border-white/30">
                  <div className="w-full h-full bg-black dark:bg-white rounded-full" />
                </div>
                <Separator orientation="vertical" />
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="flex-shrink-0 w-fit h-fit rounded-lg overflow-hidden flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 p-1 shadow-sm">
                  <Image
                    src={`https:${education.fields.logo.fields.file.url}`}
                    alt={education.fields.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain rounded-sm"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-col">
                    <LinkPreview
                      url={education.fields.website}
                      className="max-w-fit"
                    >
                      <h3 className="flex flex-row items-center gap-2 text-lg md:text-xl font-bold">
                        {education.fields.name}
                        <ExternalLinkIcon className="w-4 h-4" />
                      </h3>
                    </LinkPreview>
                    <h4 className="text-md md:text-lg font-semibold text-zinc-500 dark:text-zinc-400">
                      {education.fields.program}
                    </h4>
                  </div>
                  <p className="text-md md:text-lg text-zinc-700 dark:text-zinc-200 text-justify">
                    {education.fields.description}
                  </p>
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                    {education.fields.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function formatDate(date: string) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();
  return `${month}. ${year}`;
}

function timeSpan(startDate: string, endDate?: string) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  const totalMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  const remainingMonths = totalMonths % 12;
  const years =
    diffYears > 0 ? `${diffYears} year${diffYears === 1 ? "" : "s"},` : "";
  const months =
    remainingMonths > 0
      ? `${remainingMonths} month${remainingMonths === 1 ? "" : "s"}`
      : "";
  return `${years} ${months}`;
}
