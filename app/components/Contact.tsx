"use client";
import { slideIn } from "@/app/utils/motion";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionWrapper } from "./HigherOrderComponents";
import { EarthCanvas } from "./canvas";

// Toast notification component
const Toast = ({ message, type, isVisible, onClose }: {
	message: string;
	type: 'success' | 'error';
	isVisible: boolean;
	onClose: () => void;
}) => {
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				onClose();
			}, 4000); // Disappear after 4 seconds
			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, x: 300, scale: 0.3 }}
					animate={{ opacity: 1, x: 0, scale: 1 }}
					exit={{ opacity: 0, x: 300, scale: 0.5 }}
					transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
					className="fixed bottom-6 right-6 z-50"
				>
					<div className={`
						${type === 'success' 
							? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400' 
							: 'bg-gradient-to-r from-red-500 to-rose-600 border-red-400'
						}
						border border-opacity-30 backdrop-blur-lg bg-opacity-90
						px-6 py-4 rounded-xl shadow-2xl max-w-sm min-w-[320px]
						transform transition-all duration-300
					`}>
						<div className="flex items-center space-x-3">
							{/* Icon */}
							<div className="flex-shrink-0">
								{type === 'success' ? (
									<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
								) : (
									<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								)}
							</div>
							
							{/* Message */}
							<div className="flex-1">
								<p className="text-white font-medium text-sm leading-5">
									{message}
								</p>
							</div>
							
							{/* Close button */}
							<button
								onClick={onClose}
								className="flex-shrink-0 text-white hover:text-gray-200 transition-colors duration-200"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						
						{/* Progress bar */}
						<motion.div
							className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 rounded-b-xl"
							initial={{ width: "100%" }}
							animate={{ width: "0%" }}
							transition={{ duration: 4, ease: "linear" }}
						/>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Contact = () => {
	const formRef = useRef<HTMLFormElement>(null);

	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState({
		isVisible: false,
		message: "",
		type: 'success' as 'success' | 'error'
	});

	const showToast = (message: string, type: 'success' | 'error') => {
		setToast({ isVisible: true, message, type });
	};

	const hideToast = () => {
		setToast(prev => ({ ...prev, isVisible: false }));
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Basic validation
			if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
				showToast("Please fill in all fields", 'error');
				setLoading(false);
				return;
			}

			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contacts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to save contact");
			}

			// Success
			showToast("🎉 Thank you! Your message has been sent successfully.", 'success');
			setForm({ name: "", email: "", message: "" });
			
			// Reset form ref if needed
			if (formRef.current) {
				formRef.current.reset();
			}

		} catch (error: any) {
			console.error("Error submitting to backend:", error);
			const errorMessage = error.message.includes("Email already exists") 
				? "This email has already been used. Please use a different email."
				: "Something went wrong. Please try again later.";
			showToast(errorMessage, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="xl:mt-5 xl:flex-row flex-col-reverse flex gap-5 overflow-hidden">
				<motion.div
					variants={slideIn("left", "tween", 0.2, 1)}
					className="flex-[1] bg-black-100 p-10 rounded-2xl"
				>
					<p className="heroSubText">Get in Touch</p>
					<h3 className="heroHeadText">Contact.</h3>
					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className="mt-8 flex flex-col gap-1"
					>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-4">Your Name.</span>
							<input
								type="text"
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder="What's your name?"
								disabled={loading}
								className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
							/>
						</label>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-4">Your Email.</span>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="What's your email?"
								disabled={loading}
								className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
							/>
						</label>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-4">Your Message.</span>
							<textarea
								rows={3}
								name="message"
								value={form.message}
								onChange={handleChange}
								placeholder="What do you want to say?"
								disabled={loading}
								className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 resize-none"
							/>
						</label>
						<button
							type="submit"
							disabled={loading}
							className="bg-tertiary py-3 px-8 mt-5 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-opacity-80 active:scale-95"
						>
							{loading ? (
								<span className="flex items-center space-x-2">
									<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									<span>Sending...</span>
								</span>
							) : (
								"Send Message"
							)}
						</button>
					</form>
				</motion.div>
				<motion.div
					variants={slideIn("right", "tween", 0.2, 1)}
					className="xl:flex-1 xl:h-auto md:h-[450px] h-[250px]"
				>
					<EarthCanvas />
				</motion.div>
			</div>

			{/* Toast Notification */}
			<Toast
				message={toast.message}
				type={toast.type}
				isVisible={toast.isVisible}
				onClose={hideToast}
			/>
		</>
	);
};

export default SectionWrapper(Contact, "contact");