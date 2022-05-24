import Image from 'next/image';
import useRestaurante from '../hooks/useRestaurante';
import Categoria from './Categoria';

function Sidebar() {
	const { categorias } = useRestaurante();
	return (
		<>
			<Image width={300} height={100} src='/assets/img/logo.svg' alt='logo' />
			<nav className='mt-10'>
				{categorias.map(categoria => (
					<Categoria key={categoria.id} categoria={categoria} />
				))}
			</nav>
		</>
	);
}

export default Sidebar;