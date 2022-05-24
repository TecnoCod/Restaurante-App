import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Modal from 'react-modal';
import useRestaurante from '../hooks/useRestaurante';
import ModalProducto from '../components/ModalProducto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paginas from '../components/Paginas';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
Modal.setAppElement('#__next');

function Layout({ children, pagina }) {
	const { modal } = useRestaurante();
	return (
		<>
			<Head>
				<title>Restaurante - {pagina}</title>
				<meta name='descripcion' content='Restaurante' />
			</Head>

			<div className='md:flex'>
				<aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5 bg-slate-500'>
					<Sidebar />
				</aside>
				<main className='md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
					<div className='p-10'>
						<Paginas />
						{children}
					</div>
				</main>
			</div>
			{modal && (
				<Modal isOpen={modal} style={customStyles}>
					<ModalProducto />
				</Modal>
			)}
			<ToastContainer />
		</>
	);
}
export default Layout;
