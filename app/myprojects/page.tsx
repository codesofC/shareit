// @ts-nocheck

"use client";

import { db } from "@/components/Firebase";
import Loading, { useLoadingContext } from "@/components/Loading";
import ProjectItem from "@/components/ProjectItem";
import UserInfo from "@/components/UserInfo";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Myprojects = () => {
  const [projects, setProjects] = useState([]);
  const { data: session } = useSession();

  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    setIsLoading(true);
    getUserProjects();
  }, [session]);

  const getUserProjects = async () => {
    setProjects([]);

    if (session) {
      const q = query(
        collection(db, "projects"),
        where("email", "==", session?.user?.email)
      );

      const fetchData = await getDocs(q);

      fetchData.forEach(
        (doc) => {
          setProjects((prevState) => [...prevState, doc.data()]);
        }
      );
      setIsLoading(false);
    }
  };

  return !isLoading ? (
    <div className="projects-user">
      <UserInfo />

      {projects.length > 0 ? (
        <div className="projects-user-container">
          {projects.map((item, index) => (
            <ProjectItem key={index} project={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-red-500 font-bold mt-24">
          {" "}
          No available project add{" "}
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Myprojects;
