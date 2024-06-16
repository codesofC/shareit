// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/components/Firebase";
import ProjectItem from "@/components/ProjectItem";
import { Input } from "@/components/ui/input";
import Loading, { useLoadingContext } from "@/components/Loading";
import CustomButton  from "@/components/CustomButton";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useSession } from "next-auth/react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const { isLoading, setIsLoading } = useLoadingContext();
  const {data: session} = useSession()

  useEffect(() => {
    getUserProjects();

  }, []);

  const getUserProjects = async () => {
    setIsLoading(true);

    setProjects([]);

    const q = query(collection(db, "projects"), orderBy("title"));

    const fetchData = await getDocs(q);

    fetchData.forEach(
      (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        setProjects((prevState) => [...prevState, doc.data()]);
      }
    );

    setIsLoading(false);
  };

 
  const searchProject = projects.filter(project => (project.username.toLowerCase().includes(search.toLowerCase())) || (project.title.toLowerCase().includes(search.toLowerCase())));


  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex-center flex-col gap-12 py-12">
      <div className="flex-center flex-col gap-6 min-h-[40vh]">
        <h1 className="text-center text-4xl uppercase font-extrabold md:w-[90%] lg:w-[60%] basicAnimation">
          {" "}
          Share your Project and Eplore your knowlegde{" "}
          <i className="gradientOpacity">with others</i>{" "}
        </h1>
        <div className="flex items-center w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] p-2 rounded-xl shadow-sm border">
          <Input name="search" placeholder="Search by creator, title and more" className="flex-1 h-full border-none bg-transparent" onChange={e => setSearch(e.target.value)} />
          {!session && <CustomButton 
            title="Sign In"
            customStyles="bg-primary text-white px-6 font-bold"
          />}
        </div>
        <BackgroundBeams className="-z-10" />
      </div>

      {projects.length > 0 ? (
        <div className="projects-user-container px-4 md:px-8 lg:px-12 xl:px-24">
          {searchProject.map((item, index) => (
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
