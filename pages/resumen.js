import Layout from '../layout/Layout';
import useRestaurante from '../hooks/useRestaurante';
import ResumenProducto from '../components/ResumenProducto';

function Resumen() {
	const { pedido } = useRestaurante();

	return (
		<Layout pagina='Resumen'>
			<h1 className='text-4xl font-black'>Resumen</h1>
			<p className='text-2xl my-10'>Revisa tu pedido</p>

			{pedido.length === 0 ? (
				<p className='text-2xl text-center'>No hay elementos en tu pedido</p>
			) : (
				pedido.map(producto => (
					<ResumenProducto producto={producto} key={producto.id} />
				))
			)}
		</Layout>
	);
}

export default Resumen;
