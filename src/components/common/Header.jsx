import { MapPin } from "lucide-react";

const Header = ({ title, ubicacion = "Tu ubicación" }) => {
	return (
		<header className='bg-white text-black text-center backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				<div className="flex items-center justify-center space-x-3">
					{/* Logo de palta/aguacate */}
					<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
						<span className="text-black font-bold text-sm">🥑</span>
					</div>
					
					{/* Texto */}
					<div className="text-left">
						<h1 className='text-2xl font-semibold text-black'>{title}</h1>
						<div className="flex items-center space-x-1 mt-1">
							<span className="text-green-950 text-sm">Hola, tu parcela de cultivo en</span>
							<div className="flex items-center space-x-1">
								<MapPin size={14} className="text-black" />
								<span className="text-black font-medium text-sm bg-transparent border-0">
									{ubicacion}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;