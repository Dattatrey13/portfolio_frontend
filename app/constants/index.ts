export const navLinks = [
	{
		id: "about",
		title: "About",
	},
	{
		id: "work",
		title: "Work",
	},
	{
		id: "contact",
		title: "Contact",
	},
];

const services = [
	{
		title: "UI/UX Enthusiast",
		icon: "/backend.webp",
	},
	{
		title: "Full Stack Web Developer",
		icon: "/web.webp",
	},
	{
		title: "Mobile App Developer",
		icon: "/mobile.webp",
	},
	{
		title: "Java Programmer",
		icon: "/creator.webp",
	},
];

const technologies = [
	{
		name: "HTML",
		icon: "/tech/html.webp",
	},
	{
		name: "CSS",
		icon: "/tech/css.webp",
	},
	{
		name: "JavaScript",
		icon: "/tech/javascript.webp",
	},
	{
		name: "TypeScript",
		icon: "/tech/typescript.webp",
	},
	{
		name: "React JS",
		icon: "/tech/reactjs.webp",
	},
	{
		name: "Next.JS",
		icon: "/tech/nextjs.svg",
	},
	{
		name: "Redux Toolkit",
		icon: "/tech/redux.webp",
	},
	{
		name: "Tailwind CSS",
		icon: "/tech/tailwind.webp",
	},
	{
		name: "Flutter",
		icon: "/tech/flutter.png",
	},
	{
		name: "git",
		icon: "/tech/git.webp",
	},
	{
		name: "React Native",
		icon: "/tech/reactjs.webp",
	},
	// {
	// 	name: "wordpress",
	// 	icon: "/tech/wordpress.webp",
	// },
	{
		name: "bootstrap",
		icon: "/tech/bootstrap.webp",
	},
];

const experiences = [
	{
		title: "Web Developer",
		company_name: "Pyonix Technology",
		icon: "/company/avm.webp",
		iconBg: "#383E56",
		date: " 2024 - 2025",
		points: [
			"Developed and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
			"Built responsive and interactive frontend components with React.js and modern UI libraries like Tailwind CSS and Material UI.",
			"Designed and integrated RESTful APIs and handled backend logic using Node.js and Express.",
			"Used Git, GitHub, and Agile methodology for version control and team collaboration.",
		],
	},
	{
		title: "ReactNative App Developer",
		company_name: "Pyonix Technology",
		icon: "/company/sparkbright.webp",
		iconBg: "#E6DEDD",
		date: "2025 - Present",
		points: [
			" Created a visually appealing and user-friendly mobile interface, implementing dynamic components, smooth navigation (React Navigation), and responsive layouts.",
			"Integrated RESTful APIs for authentication, product listings, cart, and order management. Used Axios for API calls and Redux/Context API for efficient state management.",
			"Worked with backend teams and designers to align app features with business goals and ensure a cohesive user experience."
		],
	},
	{
		title: "Flutter App Developer",
		company_name: "Pyonix Technology",
		icon: "/company/wtw.jpg",
		iconBg: "#E6DEDD",
		date: "2025 - Present",
		points: [
			"Actively analyzed user and stakeholder feedback to identify issues and implement bug fixes, ensuring a smoother user experience and higher app stability.",
			"Focused on optimizing app performance through efficient state management, code refactoring, and responsive UI across devices.",
			" Regularly added and maintained key features such as appointment booking, customer support, service tracking, and gallery updates.",
			"Handled app publishing, hosting integrations (e.g., Firebase), and ongoing post-deployment maintenance to ensure uptime and performance.",
		],
	},
];

const testimonials = [
	// {
	// 	id: 1,
	// 	testimonial:
	// 		"Behance is a social media platform owned by Adobe whose main focus is to showcase and discover creative work.",
	// 	name: "Dattatrey Joshi",
	// 	image: "/socialmedia/behance.svg",
	// 	link: "https://www.behance.net/omthecreator",
	// },
		{
		id: 1,
		testimonial:
			"Also do check out my Github Profile where I have shared all my codes from basic to advanced.",
		name: "Dattatrey Joshi",
		image: "/tech/github.webp",
		// link: "https://github.com/omunite215",
	},
	{
		id: 2,
		testimonial:
			"LinkedIn is a business and employment-focused social media platform that works through websites and mobile apps.",
		name: "Dattatrey Joshi",
		image: "/socialmedia/linkedin.svg",
		link: "https://www.linkedin.com/in/dattatreyjoshi13",
	},
	{
		id: 3,
		testimonial:"Instagram",
		name: "Dattatrey Joshi",
		image: "/socialmedia/dribble.svg",
		link: "https://www.instagram.com/rudrainfotech.d?igsh=cWE1amY0aXF0Y2Rp",
	},
	// {
	// 	id: 4,
	// 	testimonial:
	// 		"Also do check out my UI/UX Portfolio where I have shared by design studies.",
	// 	name: "Dattatrey Joshi",
	// 	image: "/socialmedia/portfolio.svg",
	// 	link: "https://omthecreator.netlify.app/",
	// },

];


const projects :{
	name: string;
	description: string;
	tags: {
		name: string;
		color: string;
	}[];
	image: string;
	source_code_link?: string;
	deploy_link: string;
	platform: "Android Studio" | "Vercel" | "Figma" | "App" | "Web" | "Wordpress" | "Mobile"
}[] = [
	{
		name: "Digitronix",
		description:
			"A Designed and developed a visually appealing and user-friendly Digitronix Mobile eCommerce App.",
		tags: [
			{
				name: "App",
				color: "blue-text-gradient",
			},
			{
				name: "Android | ios",
				color: "green-text-gradient",
			},
		],
		image: "/projectimg/avm.webp",
		platform: "Mobile",
		deploy_link: "https://avmauto.in/",
	},
	{
		name: "Gujarat Tourism",
		description:
			" Designed and developed a visually appealing and user-friendly tourism web.",
		tags: [
			{
				name: "Reactjs",
				color: "red-text-gradient",
			},
			{
				name: "Node",
				color: "orange-text-gradient",
			},
			{
				name: "Mongodb",
				color: "blue-text-gradient",
			},
		],
		image: "/projectimg/sparkbright.png",
		// source_code_link: "https://github.com/omunite215/React-Admin-DashBoard",
		platform: "Web",
		deploy_link: "https://sparkbright.in/",
	},
	{
		name: "Dapperz",
		description:
			"A responsive Bank HomePage showcasing different features such as various payment gateways integration, easy money transfer, advanced security, etc. It has a beautiful interface made using Tailwind CSS and React",
		tags: [
			{
				name: "next",
				color: "green-text-gradient",
			},
			{
				name: "tailwind",
				color: "blue-text-gradient",
			},
		],
		image: "/projectimg/hoobank.webp",
		// source_code_link: "https://github.com/omunite215/hoobank",
		platform: "Vercel",
		deploy_link: "https://hoobankbyom.netlify.app/",
	},
	{
		name: "Admin Dashboard",
		description:
			" Designed and developed a visually appealing and user-friendly Data Analytics Dashboard using MERN",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "materialui",
				color: "orange-text-gradient",
			},
			{
				name: "MongoDB",
				color: "green-text-gradient",
			},
			{
				name: "Express",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/mern.png",
		// source_code_link: "https://github.com/omunite215/Project_MERN-Dashboard",
		platform: "Web",
		deploy_link: "https://admin-frontend-r705.onrender.com/",
	},
	{
		name: "Order Notification App",
		description:
			"A Modern UI/UX Landing Page using Framer Motion and TailwindCSS with a feel and looks of Web 3.0",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "tailwind",
				color: "green-text-gradient",
			},
			{
				name: "framer-motion",
				color: "orange-text-gradient",
			},
		],
		image: "/projectimg/metaverse.png",
		// source_code_link: "https://github.com/omunite215/Project_Metaverse",
		platform: "Vercel",
		deploy_link: "https://project-metaverse-beta.vercel.app/",
	},
	{
		name: "Issue Tracker",
		description:
			"A Next.JS Full Stack Issue Tracker made using Next.Js, ShadCN UI, Prisma, mySQL with latest features like Next.JS Server Components, and Serverless features.",
		tags: [
			{
				name: "next",
				color: "blue-text-gradient",
			},
			{
				name: "tailwind",
				color: "green-text-gradient",
			},
			{
				name: "shadCN",
				color: "orange-text-gradient",
			},
			{
				name: "mySQL",
				color: "green-text-gradient",
			},
		],
		image: "/projectimg/issuetracker.png",
		// source_code_link: "https://github.com/omunite215/Project_Issue-Tracker",
		platform: "Vercel",
		deploy_link: "https://project-issue-tracker.vercel.app/",
	},
];

export { services, technologies, experiences, testimonials, projects };
