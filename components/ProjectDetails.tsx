"use client";

import { AddProjectProperties } from "@/types/index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import {
  BookText,
  Figma,
  Github,
  Link2,
  PictureInPicture2,
  X,
  Youtube,
} from "lucide-react";
import { deleteProject } from "./Firebase";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type ProjectItem = {
  project: AddProjectProperties;
  setIsOpen: (open: boolean) => void;
};

const ProjectDetails = ({ project, setIsOpen }: ProjectItem) => {
  const { data: session } = useSession();

  const deleteProjectFunction = () => {
    deleteProject(project.id);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="modal-container">
      <Card className="card-container overflow-y-auto relative">
        <CardHeader>
          <CardTitle className="font-bold"> {project.title} </CardTitle>
        </CardHeader>
        <CardContent className="card-content">
          <div className="card-part-left">
            <div className="card-part-left-1">
              <Image
                src={project.urlImageProject}
                width={300}
                height={300}
                alt={project.title}
                className="object-cover w-full"
              />
            </div>

            <div className="flex-start flex-col gap-2 border-b pb:4 md:pb-8 w-full">
              <h3 className="text-lg font-semibold"> Description </h3>
              <p className="text-gray-400 flex-wrap">
                {project.description}
              </p>
            </div>

            <div className="card-part-left-2">
              {project.urlImageProfil && (
                <Image
                  src={project.urlImageProfil}
                  width={40}
                  height={40}
                  alt={"profil"}
                  className="object-contain rounded-full"
                />
              )}
              <div className="flex-start flex-col gap-1">
                <span className="font-bold"> {project.username} </span>
                <span className="text-gray-400 font-extralight">
                  {" "}
                  {project.email}{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="card-part-right">
            <div className="card-part-right-content">
              <h3 className="font-bold"> Technology </h3>
              <div className="techs-container">
                {project.technologies.map((techname: string, index) => (
                  <div
                    key={index}
                    className="flex-center flex-wrap px-4 py-1 border border-gray-300 rounded-sm"
                  >
                    <span className="font-semibold text-gray-400 text-sm"> {techname} </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-part-right-content">
              <h3 className="font-bold"> Source/Links </h3>
              {project.urlDemo && (
                <div className="source-links">
                  <Link target="_blank" href={project.urlDemo}>
                    <span className="text-sky-600 font-bold text-lg">
                      <Link2 />
                    </span>
                    <span className="">{project.urlDemo}</span>
                  </Link>
                </div>
              )}
              {project.urlDesign && (
                <div className="source-links">
                  <Link target="_blank" href={project.urlDesign}>
                    <span className="text-orange-600 font-bold text-lg">
                      <Figma />
                    </span>
                    <span className="">{project.urlDesign}</span>
                  </Link>
                </div>
              )}
              {project.urlGithubCode && (
                <div className="source-links">
                  <Link target="_blank" href={project.urlGithubCode}>
                    <span className="font-bold text-lg">
                      <Github />
                    </span>
                    <span className="">{project.urlGithubCode}</span>
                  </Link>
                </div>
              )}
              {project.urlYoutubeTuto && (
                <div className="source-links">
                  <Link target="_blank" href={project.urlYoutubeTuto}>
                    <span className="text-red-600 font-bold text-lg">
                      <Youtube />
                    </span>
                    <span className="">{project.urlYoutubeTuto}</span>
                  </Link>
                </div>
              )}
              {project.urlPortfolio && (
                <div className="source-links">
                  <Link target="_blank" href={project.urlPortfolio}>
                    <span className="text-green-600 font-bold text-lg">
                      <BookText />
                    </span>
                    <span className="">{project.urlPortfolio}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-4 justify-end">
          {session?.user?.email === project.email ? (
            <CustomButton
              title="Delete"
              type="button"
              handleEvent={() => deleteProjectFunction()}
              customStyles="bg-red-600 text-white hover:bg-red-500"
            />
          ) : null}
          <X
            className="absolute top-4 right-4 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectDetails;
