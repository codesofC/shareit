"use client";

import { AddProjectProperties } from "@/types/index";
import Image from "next/image";
import { useState } from "react";
import ProjectDetails from "./ProjectDetails";


type ProjectItem = {
  project: AddProjectProperties;
}

const ProjectItem = ({ project }: ProjectItem) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="projects-user-content" onClick={() => setIsOpen(true)}>
        <Image
          src={project.urlImageProject}
          width={480}
          height={400}
          alt={project.title}
          className="object-contain w-full rounded-md"
        />
        <span className="px-4 font-semibold text-[13px] line-clamp-2">
          {" "}
          {project.title}{" "}
        </span>
      </div>
      {
        isOpen ? <ProjectDetails project={project} setIsOpen={setIsOpen} />
        : null
      }
    </>
  );
};

export default ProjectItem;
