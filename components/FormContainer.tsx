// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { techs } from "@/app/api/stacks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import CustomButton from "./CustomButton";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { addProject, storage } from "./Firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Upload } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.string().array(),
  urlDemo: z.string(),
  urlDesign: z.string(),
  urlYoutubeTuto: z.string(),
  urlGithubCode: z.string(),
  urlPortfolio: z.string(),
  urlImageProject: z.string(),
});

const initialState = {
  title: "",
  description: "",
  technologies: [""],
  urlDemo: "",
  urlDesign: "",
  urlYoutubeTuto: "",
  urlGithubCode: "",
  urlPortfolio: "",
  urlImageProject: "",
};

const FormContainer = () => {
  const [inputs, setInputs] = useState(initialState);

  const [techList, setTechList] = useState<string[]>([]);

  const [fileImage, setFileImage] = useState();

  let submit = false;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data: session } = useSession();

  const handleChangeInputs = (e: any) => {
    const name = e.target.name ? e.target.name : e.target.id;
    const value = e.target.value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckBoxes = (name: string, e: any) => {
    if (e.target.checked) {
      setTechList((prevState) => [...prevState, name]);
    } else {
      let techListItem = techList.filter((item) => item != name);
      setTechList(techListItem);
    }
  };

  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      technologies: techList,
    }));
  }, [techList]);

  const onHandleSubmit = async (e: any) => {
    e.preventDefault();

    const storageRef = ref(storage, `projects/${fileImage?.name}`);

    uploadBytes(storageRef, fileImage)
      .then(() => {
        console.log("Uploaaded blod");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then((url) => {
          const id = Date.now().toString();
          inputs.urlImageProject = url;
          submit = true;

          addProject(
            {
              ...inputs,
              urlImageProfil: session?.user?.image,
              email: session?.user?.email,
              username: session?.user?.name,
              id,
            },
            id
          );

          router.push("/myprojects");
        });
      });
  };

  useEffect(() => {
    if (submit) {
    }
    console.log(submit);
  }, [submit]);

  return (
    <Form {...form}>
      <form onSubmit={onHandleSubmit} className="form-container">
        <div className="form-content">
          <div className="flex-center flex-col gap-4">
            <h1 className="text-3xl font-extrabold text-white">ADD PROJECT</h1>
            <p className="text-sm">
              {" "}
              Create a new project and Explore with Community{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="relative w-full flex flex-col items-center justify-center border rounded-md p-4 h-[300px] overflow-hidden">
              <Upload />
              <span> Upload image </span>
              {fileImage && (
                <Image 
                  src={URL.createObjectURL(fileImage)}
                  width={800}
                  height={800}
                  alt="image"
                  className="absolute w-full h-full top-0 left-0 z-10 object-cover"
                />
              )}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="form-content-inputs">
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/gif, image/jpeg, image/png"
                        aria-label="imageChoice"
                        {...field}
                        className="text-[15px] absolute top-0 left-0 w-full h-full cursor-pointer z-20 opacity-0"
                        onChange={(e) => setFileImage(e.target.files[0])}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="form-content-inputs">
                    <FormControl>
                      <Input
                        placeholder="Title"
                        aria-label="title"
                        className="text-[15px]"
                        {...field}
                        required
                        onChange={handleChangeInputs}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="form-content-inputs">
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Write Description here"
                        aria-label="description"
                        {...field}
                        className="outline-none text-[15px] min-h-[230px]"
                        required
                        onChange={handleChangeInputs}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className=" w-full flex flex-col gap-3">
            <h4 className="text-xl font-bold"> Select Technology </h4>
            <div className="grid grid-cols-3 items-center justify-start gap-2">
              {techs.map((stack) => (
                <FormField
                  control={form.control}
                  key={stack.id}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem key={stack.id}>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <input
                            id={stack.name}
                            type="checkbox"
                            onClick={(e) => handleCheckBoxes(stack.name, e)}
                          />
                          <label htmlFor={stack.name} className="flex-wrap">{stack.name}</label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
          <FormField
            control={form.control}
            name="urlDemo"
            render={({ field }) => (
              <FormItem className="form-content-inputs">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="App Demo Url"
                    aria-label="demo"
                    {...field}
                    className="text-[15px]"
                    onChange={handleChangeInputs}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urlDesign"
            render={({ field }) => (
              <FormItem className="form-content-inputs">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="UI/UX Design Url(Figma)"
                    aria-label="design"
                    {...field}
                    className="text-[15px]"
                    onChange={handleChangeInputs}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urlGithubCode"
            render={({ field }) => (
              <FormItem className="form-content-inputs">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Github Source Code Url"
                    aria-label="code"
                    {...field}
                    className="text-[15px]"
                    onChange={handleChangeInputs}
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urlYoutubeTuto"
            render={({ field }) => (
              <FormItem className="form-content-inputs">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Youtube Tuto Url"
                    aria-label="code"
                    {...field}
                    className="text-[15px]"
                    onChange={handleChangeInputs}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urlPortfolio"
            render={({ field }) => (
              <FormItem className="form-content-inputs">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Portfolio Url"
                    aria-label="portfolio"
                    {...field}
                    className="text-[15px]"
                    onChange={handleChangeInputs}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <CustomButton
          type="submit"
          title="Submit"
          customStyles="bg-green-600 text-white"
        />
      </form>
    </Form>
  );
};

export default FormContainer;
