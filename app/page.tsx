// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/components/Firebase";
import ProjectItem from "@/components/ProjectItem";
import { Input } from "@/components/ui/input";
import Loading, { useLoadingContext } from "@/components/Loading";

export default function Home() {
  const [projects, setProjects] = useState([]);

  const { isLoading, setIsLoading } = useLoadingContext();

  let timeout;

  useEffect(() => {
    getUserProjects();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const getUserProjects = async () => {
    setIsLoading(true);

    setProjects([]);

    const q = query(collection(db, "projects"), where("email", "!=", ""));

    const fetchData = await getDocs(q);

    fetchData.forEach(
      (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        setProjects((prevState) => [...prevState, doc.data()]);
      }
    );

    setIsLoading(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex-center flex-col gap-12 py-12">
      <div className="flex-center flex-col gap-6">
        <h1 className="flex flex-wrap text-center text-4xl font-extrabold md:w-[90%] lg:w-[80%]">
          {" "}
          Share your Project, Code, Video and Eplore your knowlegde with other{" "}
        </h1>
        <Input
          name="search"
          placeholder="Search"
          className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] px-2 md:px-4 lg:px-6 py-2 shadow-sm outline-none"
        />
      </div>

      {projects.length > 0 ? (
        <div className="projects-user-container px-4 md:px-8 lg:px-12 xl:px-24">
          {projects.map((item, index) => (
            <ProjectItem key={index} project={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-red-500 font-bold mt-24">
          {" "}
          No available project found{" "}
        </div>
      )}
    </div>
  );
}
