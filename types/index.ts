import { MouseEventHandler } from "react"

export interface CustomButtonProps {
    title: string,
    type?: "button" | "submit",
    customStyles?: string,
    handleEvent?: MouseEventHandler<HTMLButtonElement>
}

export interface UserAvatarProps{
    displaySubmenu: boolean;
    setDisplaySubmenu: (val: boolean) => void;
}

export interface AddProjectProperties{
    id: string;
    title: string;
    description: string;
    technologies: string [];
    urlDemo: string;
    urlDesign: string;
    urlGithubCode: string;
    urlPortfolio: string;
    urlImageProject: string;
    urlYoutubeTuto: string,
    username: string | null | undefined;
    email: string | null | undefined;
    urlImageProfil: string | null | undefined;
}