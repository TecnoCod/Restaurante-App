import Layout from '../layout/Layout';
import useRestaurante from '../hooks/useRestaurante';
import { useEffect } from 'react';
import { formatearDinero } from '../helpers';

export default function Total() {
	const { pedido, nombre, setNombre, colocarOrden, total } = useRestaurante();

	const comprobarPedido = () => {
		return pedido.length === 0 || nombre === '' || nombre.length < 3;
	};

	useEffect(() => {
		comprobarPedido();
	}, [pedido]);

	return (
		<Layout pagina='Total'>
			<h1 className='text-4xl font-black'>Total</h1>
			<p className='text-2xl my-10'>Confirma tu Pedido</p>

			<form onSubmit={colocarOrden}>
				<div>
					<label
						htmlFor='nombre'
						className='block uppercase text-slate-800 font-bold text-xl'
					>
						Nombre
					</label>
					<input
						id='nombre'
						type='text'
						className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>
				<div className='mt-10'>
					<p className='text-2xl'>
						Total a Pagar {formatearDinero(total)}
						<span className='font-bold'></span>
					</p>
				</div>

				<div className='mt-5'>
					<input
						type='submit'
						className={`${
							comprobarPedido()
								? 'bg-slate-200'
								: 'bg-slate-600 hover:bg-slate-500'
						} w-full lg:w-auto px-5 py-2 rounded uppercase text-white font-bold  text-center`}
						value='Confirmar Pedido'
						disabled={comprobarPedido()}
					/>
				</div>
			</form>
		</Layout>
	);
}
