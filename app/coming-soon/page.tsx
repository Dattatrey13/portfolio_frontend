"use client";
import { slideIn, textVariant, fadeIn } from "@/app/utils/motion";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { SectionWrapper } from "@/app/components/HigherOrderComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

type ProjectData = {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  platform: string;
  deploy_link: string;
};

const ComingSoonContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const statuses = [
    "Coming Soon",
    "Under Development", 
    "Almost Ready"
  ];

  useEffect(() => {
    console.log('ComingSoon mounted, checking for project data...'); // Debug log
    
    const projectParam = searchParams.get('project');
    console.log('Project param:', projectParam); // Debug log
    
    if (projectParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(projectParam));
        console.log('Decoded project data:', decoded); // Debug log
        setProjectData(decoded);
      } catch (error) {
        console.error('Error parsing project data:', error);
        // Set default data if parsing fails
        setProjectData({
          name: "Project",
          description: "This project is currently under development.",
          tags: [],
          image: "/default-project.png",
          platform: "Web",
          deploy_link: "#"
        });
      }
    } else {
      console.log('No project data found, using defaults');
      // Set default data if no project param
      setProjectData({
        name: "Something Amazing",
        description: "This project is currently under development and will be available soon.",
        tags: [],
        image: "/default-project.png",
        platform: "Web",
        deploy_link: "#"
      });
    }
    
    setIsLoading(false);
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % statuses.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [statuses.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-primary overflow-hidden flex items-center justify-center">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        
        {/* Project Image (if available) */}
        {projectData?.image && (
          <motion.div
            variants={fadeIn("down", "spring", 0, 1)}
            initial="hidden"
            animate="show"
            className="mb-8 mx-auto max-w-md"
          >
            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/25">
              <Image
                src={projectData.image}
                alt={projectData.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Status Badge */}
        <motion.div
          variants={fadeIn("down", "spring", 0.1, 1)}
          initial="hidden"
          animate="show"
          className="inline-block mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStatus}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-purple-300 font-medium text-sm tracking-wider uppercase"
              >
                {statuses[currentStatus]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          variants={textVariant(0.2)}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <h1 className="text-white text-[40px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[100px] font-black leading-[0.8] bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            {projectData?.name || "Something Amazing"}
          </h1>
          <h2 className="text-[26px] xs:text-[30px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-black leading-[0.8] bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            is Coming Soon
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("up", "tween", 0.3, 1)}
          initial="hidden"
          animate="show"
          className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-secondary max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          {projectData?.description || 
           "This project is currently under development and will be available soon. We're working hard to bring you an incredible experience with cutting-edge technology and modern design."}
        </motion.p>

        {/* Project Tags */}
        {projectData?.tags && projectData.tags.length > 0 && (
          <motion.div
            variants={fadeIn("up", "tween", 0.35, 1)}
            initial="hidden"
            animate="show"
            className="mb-8 flex flex-wrap justify-center gap-3"
          >
            {projectData.tags.map((tag: any, index: number) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </motion.div>
        )}

        {/* Platform Badge */}
        {projectData?.platform && (
          <motion.div
            variants={fadeIn("up", "tween", 0.37, 1)}
            initial="hidden"
            animate="show"
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full backdrop-blur-sm">
              <span className="text-blue-300 font-medium">Platform: {projectData.platform}</span>
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.div
          variants={fadeIn("up", "tween", 0.4, 1)}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <button
            onClick={() => {
              console.log('Back button clicked');
              router.back();
            }}
            className="bg-tertiary hover:bg-tertiary/80 py-3 px-6 text-white font-medium rounded-xl border border-white/10 transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </button>
        </motion.div>

        {/* Countdown Timer Placeholder */}
        <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <h3 className="text-xl md:text-2xl text-white font-semibold mb-8">
            Launching Soon
          </h3>
        </motion.div>

        {/* Email Signup Placeholder */}
        <motion.div
          variants={fadeIn("up", "tween", 0.6, 1)}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <h3 className="text-xl md:text-2xl text-white font-semibold mb-6">
            Get Notified About {projectData?.name || "This Project"}
          </h3>
        </motion.div>

        {/* Social Links or Additional Info */}
        <motion.div
          variants={fadeIn("up", "tween", 0.7, 1)}
          initial="hidden"
          animate="show"
          className="flex justify-center gap-6"
        >
          <div className="flex items-center gap-2 text-secondary">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm">System Status: Preparing Launch</span>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          variants={fadeIn("up", "tween", 0.8, 1)}
          initial="hidden"
          animate="show"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-secondary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const ComingSoon = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading project details...</div>
      </div>
    }>
      <ComingSoonContent />
    </Suspense>
  );
};

// Don't wrap with SectionWrapper here as it might interfere with routing
export default ComingSoon;
