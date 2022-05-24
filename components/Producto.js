import Image from 'next/image';
import { formatearDinero } from '../helpers';
import useRestaurante from '../hooks/useRestaurante';

const Producto = ({ producto }) => {
	const { handleSetProducto, hanledChangeModal } = useRestaurante();
	const { nombre, imagen, precio } = producto;

	return (
		<div className='border p-3'>
			<Image
				src={`/assets/img/${imagen}.jpg`}
				alt={nombre}
				width={400}
				height={400}
			/>
			<div className='p-5'>
				<h3 className='text-2xl font-bold'>{nombre}</h3>
				<p className='mt-5 text-4xl text-amber-500'>
					{formatearDinero(precio)}
				</p>
				<button
					type='button'
					className='bg-slate-500 hover:bg-amber-400 text-white w-full mt-5 p-3 uppercase font-bold rounded'
					onClick={() => {
						hanledChangeModal();
						handleSetProducto(producto);
					}}
				>
					Agregar
				</button>
			</div>
		</div>
	);
};

export default Producto;
