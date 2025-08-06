"use client";
import { technologies } from "@/app/constants";
import { SectionWrapper } from "./HigherOrderComponents";
import { BallCanvas } from "./canvas";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";


const Tech = () => {
	return (
		<>
		<motion.div variants={textVariant()}>
				<h2 className="sectionHeadText">Technologies.</h2>
		</motion.div>
		
		<div className="flex flex-row flex-wrap justify-center gap-10">
			
			{technologies.map((technology) => (
				<div className="w-28 h-28" key={technology.name}>
					
					<BallCanvas icon={technology.icon}/>
					<p className="mt-2 text-sm text-center text-secondary">
						{technology.name}
					</p>
				</div>
			))}
		</div>
		</>
	);
};

export default SectionWrapper(Tech, "tech");
