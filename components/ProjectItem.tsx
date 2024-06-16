"use client";

import { AddProjectProperties } from "@/types/index";
import Image from "next/image";
import { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import { Github, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

type ProjectItem = {
  project: AddProjectProperties;
};

const ProjectItem = ({ project }: ProjectItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="projects-user-content">
        <div className="w-full border overflow-hidden rounded-md cursor-pointer" onClick={() => setIsOpen(true)}>
          <Image
            src={project.urlImageProject}
            width={480}
            height={400}
            alt={project.title}
            className="object-cover w-full h-full aspect-video"
          />
        </div>
        <div className="w-full flex items-center justify-between px-2 opacity-50">
          <span className="text-sm sm:text-md font-semibold line-clamp-1 max-w-[80%] text-white">
            {project.title}
          </span>
          <div className="flex gap-2">
            <Link target="_blank" href={project.urlGithubCode}>
              <Github size={20} />
            </Link>
            <Link target="_blank" href={project.urlDemo}>
              <LinkIcon size={20} />
            </Link>
          </div>
        </div>
      </div>
      {isOpen ? (
        <ProjectDetails project={project} setIsOpen={setIsOpen} />
      ) : null}
    </>
  );
};

export default ProjectItem;
