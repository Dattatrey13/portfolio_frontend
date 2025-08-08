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
	tags: {
		name: string;
		color: string;
	}[];
	image: string;
	source_code_link?: string;
	deploy_link: string;
	platform: "Android Studio" | "Vercel" | "Figma" | "App" | "Web" | "Wordpress" | "Mobile";
};

const ProjectCard = ({
	index,
	name,
	description,
	tags,
	image,
	source_code_link,
	deploy_link,
	platform
}: ProjectCardProps) => {
	const router = useRouter();

	const handleCardClick = () => {
		router.push('/coming-soon');
	};

	const handleLinkClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const getPlatformIcon = (platform: string) => {
		switch (platform) {
			case "Vercel":
				return "/tech/vercel.svg";
			case "Wordpress":
				return "/tech/wordpress.webp";
			case "Figma":
				return "/tech/figma.webp";
			case "Web":
				return "/web.webp";
			case "Mobile":
			case "App":
				return "/tech/mobile.webp"; 
			case "Android Studio":
				return "/tech/android.webp"; 
			default:
				return "/tech/web.webp";
		}
	};

	return (
		<motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
			<Tilt
				options={{
					max: 45,
					scale: 1,
					speed: 450,
				}}
				className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full min-w-[280px] min-h-[450px] cursor-pointer hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
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
						{source_code_link && (
							<Link
								href={source_code_link}
								target="_blank"
								className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200"
								onClick={handleLinkClick}
							>
								<Image
									src="/tech/github.webp"
									width={24}
									height={24}
									alt="source-code"
									className="object-contain"
								/>
							</Link>
						)}
						<Link
							href={deploy_link}
							target="_blank"
							className="black-gradient w-10 h-10 ml-2 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200"
							onClick={handleLinkClick}
						>
							<Image
								src={getPlatformIcon(platform)}
								width={24}
								height={24}
								alt="platform"
								className="object-contain"
							/>
						</Link>
					</div>

					{/* Hover overlay */}
					{/* <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
						<motion.div
							initial={{ scale: 0 }}
							whileHover={{ scale: 1 }}
							className="bg-white/20 backdrop-blur-sm rounded-full p-3"
						>
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
						</motion.div>
					</div> */}
				</div> 

			    <div className="mt-5">
                    <h3 className="text-white font-bold text-[24px]">{name}</h3>
                    <p className="mt-2 text-secondary text-[14px]">{description}</p>
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
					Following projects showcase my skills and experience through
					real-world examples of my work. Each project is briefly described with
					links to code repositories and live demos. Click on any project card
					to view more details. It reflects my ability to solve complex problems, 
					work with different technologies, and manage projects effectively.
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