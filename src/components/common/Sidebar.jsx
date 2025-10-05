import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{
		name: "Inicio",
		icon: BarChart2,
		color: "#2C7873",
		href: "/",
	},
	{ name: "Monitoreo y Analisis", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "Prediccion Agricola ", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Guia", icon: DollarSign, color: "#10B981", href: "/sales" },
	{ name: "Comunidad", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-[#314100] backdrop-blur-md p-4 flex flex-col border-r border-[#A2C523]'>
				{/* Logo y Nombre de la App */}
				<div className='flex items-center justify-between mb-8'>
					<div className='flex items-center space-x-3'>
						{/* Logo - puedes reemplazar el div con tu imagen */}
						<div className='w-10 h-10 bg-[#A2C523] rounded-full flex items-center justify-center'>
							<span className='text-[#314100] font-bold text-lg'>UB</span>
						</div>
						<AnimatePresence>
							{isSidebarOpen && (
								<motion.div
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2 }}
								>
									<h1 className='text-xl font-bold text-white whitespace-nowrap'>Urban Bloom</h1>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					
					{/* Botón del menú */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='p-2 rounded-full hover:bg-[#D7E878] transition-colors'
					>
						<Menu size={20} className='text-white' />
					</motion.button>
				</div>

				<nav className='flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#D7E878] transition-colors mb-2 group'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap group-hover:text-black text-white'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;