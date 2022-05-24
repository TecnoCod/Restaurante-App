import { useRouter } from 'next/router';

const paginas = [
	{ pagina: 1, nombre: 'Menu', url: '/' },
	{ pagina: 2, nombre: 'Resumen', url: '/resumen' },
	{ pagina: 3, nombre: 'Productos y Total', url: '/total' },
];

const Paginas = () => {
	const rutas = useRouter();

	const calcularProgreso = () => {
		let valor;
		if (rutas.pathname === '/') {
			valor = 25;
		} else if (rutas.pathname === '/resumen') {
			valor = 75;
		} else if (rutas.pathname === '/total') {
			valor = 100;
		}
		return valor;
	};
	return (
		<>
			<div className='flex justify-between mb-5'>
				{paginas.map(pagina => (
					<button
						className='text-2xl font-bold'
						key={pagina.pagina}
						type='button'
						onClick={() => {
							rutas.push(pagina.url);
						}}
					>
						{pagina.nombre}
					</button>
				))}
			</div>
			<div className='bg-gray-100 mb-10'>
				<div
					className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white'
					style={{ width: `${calcularProgreso()}%` }}
				></div>
			</div>
		</>
	);
};

export default Paginas;
