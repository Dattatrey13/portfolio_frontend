"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Tilt } from "react-tilt";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "./HigherOrderComponents";

type ProjectCardProps = {
  index: number;
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link?: string;
  // platform: string;
  platform: "Netlify" | "Vercel" | "Figma" | "Wordpress" | "Web" | "Mobile" | "App" | "Android Studio";

};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  // deploy_link,
  platform
}: ProjectCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    const projectData = { name, description, tags, image, platform };
    const encodedData = encodeURIComponent(JSON.stringify(projectData));
    router.push(`/coming-soon?project=${encodedData}`);
  };

  // const handleLinkClick = (e: React.MouseEvent) => {
  //   e.stopPropagation(); // allow GitHub click without triggering navigation
  // };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt options={{ max: 0, scale: 1, speed: 0 }}>
        <div
          className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full min-w-[280px] min-h-[450px] cursor-pointer hover:bg-purple-900/20 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 border border-transparent hover:border-purple-500/30"
          onClick={handleCardClick}
        >
          <div className="relative w-full h-[230px]">
            <Image
              src={image}
              width={1000}
              height={1000}
              alt="project_image"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              {source_code_link && <Link
                href={source_code_link}
                target="_blank"
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <Image
                  src="/tech/github.webp"
                  width={24}
                  height={24}
                  alt="source-code"
                  className="object-contain"
                />
              </Link>}
              {/* <Link
                href={deploy_link}
                target="_blank"
                className="black-gradient w-10 h-10 ml-2 rounded-full flex justify-center items-center cursor-pointer"
              >
                <Image
                  src={platform === "Netlify" ? "/tech/netlify.webp" : platform === "Vercel" ? "/tech/vercel.svg" : platform === "Wordpress" ? "/tech/wordpress.webp" : platform === "Web" ? "/web.webp" : "/tech/figma.webp"}
                  width={24}
                  height={24}
                  alt="source code"
                  className="object-contain"
                />
              </Link> */}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px] hover:text-purple-300 transition-colors duration-300">
              {name}
            </h3>
            <p className="mt-2 text-secondary text-[14px] hover:text-gray-300 transition-colors duration-300">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="sectionSubText">My work</p>
        <h2 className="sectionHeadText">Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through real-world
          examples of my work. Click on any project card to view more details.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
