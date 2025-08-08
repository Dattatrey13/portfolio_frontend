"use client";
import { slideIn, textVariant, fadeIn } from "@/app/utils/motion";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SectionWrapper } from "./HigherOrderComponents";

// Animated Background Particles
const BackgroundParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date (7 days from now as example)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          variants={fadeIn("up", "spring", index * 0.2, 0.8)}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-4 md:p-6 shadow-2xl border border-purple-500/20 backdrop-blur-sm">
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-xs md:text-sm text-purple-200 uppercase tracking-wider font-medium">
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Notification Signup Component
const NotifySignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setLoading(false);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <motion.div
      variants={fadeIn("up", "tween", 0.4, 1)}
      className="max-w-md mx-auto"
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for updates..."
                disabled={loading}
                className="w-full bg-tertiary/50 backdrop-blur-sm py-4 px-6 text-white placeholder:text-secondary rounded-xl outline-none border border-white/10 font-medium focus:border-purple-500/50 transition-all duration-300 disabled:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl pointer-events-none" />
            </div>
            
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 px-8 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Subscribing...</span>
                </span>
              ) : (
                "Notify Me"
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-12 h-12 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <p className="text-green-400 font-medium">
              🎉 Thank you! We'll notify you when we launch.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ComingSoon = () => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const statuses = [
    "Coming Soon",
    "Under Maintenance", 
    "Launching Soon"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % statuses.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [statuses.length]);

  return (
    <div className="relative min-h-screen bg-primary overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <BackgroundParticles />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        
        {/* Status Badge */}
        <motion.div
          variants={fadeIn("down", "spring", 0, 1)}
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
          className="mb-8"
        >
          <h1 className="heroHeadText bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Something Amazing
          </h1>
          <h2 className="heroHeadText bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            is Coming Soon
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="heroSubText max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We're working hard to bring you an incredible experience. Our team is 
          putting the finishing touches on something special. Stay tuned for updates 
          and be the first to know when we launch!
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          variants={fadeIn("up", "tween", 0.4, 1)}
          className="mb-12"
        >
          <h3 className="text-xl md:text-2xl text-white font-semibold mb-8">
            Launching In
          </h3>
          <CountdownTimer />
        </motion.div>

        {/* Email Signup */}
        <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
          className="mb-12"
        >
          <h3 className="text-xl md:text-2xl text-white font-semibold mb-6">
            Get Notified
          </h3>
          <NotifySignup />
        </motion.div>

        {/* Social Links or Additional Info */}
        <motion.div
          variants={fadeIn("up", "tween", 0.6, 1)}
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

export default SectionWrapper(ComingSoon, "coming-soon");